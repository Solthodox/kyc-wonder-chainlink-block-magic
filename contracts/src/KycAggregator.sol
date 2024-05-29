// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "chainlink/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "chainlink/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {LibString} from "solady/utils/LibString.sol";
import {DataTypes} from "src/types/DataTypes.sol";
import {IERC677} from "src/interfaces/IERC677.sol";
import {KycDataMapping} from "src/libraries/KycDataMapping.sol";
import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";

/// @title KycAggregator
/// @notice On-chain anonymous KYC oracle
contract KycAggregator is FunctionsClient {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         LIB                                */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    using LibString for uint256;
    using LibString for address;
    using FunctionsRequest for FunctionsRequest.Request;
    using KycDataMapping for DataTypes.UserKycMap;
    using SafeTransferLib for address;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         ERRORS                             */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error Unauthorized();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         EVENTS                             */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    event CreateRequest(bytes32 indexed requestId, address indexed account);
    event Success(bytes32 indexed requestId, uint256 indexed kycMap);
    event Error(bytes32 indexed requestId, bytes err);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         STORAGE                            */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    uint32 constant gasLimit = 300000;
    uint64 public subscriptionId;
    uint256 public constant SERVICE_COSTS = 0.3 ether; // 0.3 link
    uint256 public constant PROTOCOL_FEE = 0.003 ether; // 0.003 link

    /// @dev All Chainlink related addresses are hardcoded for Optimism Sepolia
    IERC677 constant LINK = IERC677(0xE4aB69C077896252FAFBD49EFD26B5D171A32410);
    address constant FUNCTIONS_ROUTER =
        0xC17094E3A1348E5C7544D4fF8A36c28f2C6AAE28;
    address treasury;
    bytes32 constant donID =
        0x66756e2d6f7074696d69736d2d7365706f6c69612d3100000000000000000000;

    /// @dev JS source code, using DON-hosted secrets for safe API calls
    string constant source =
        "const wallet = args[0];"
        "const providerId = args[1];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://kycworker.kycwonder.workers.dev/kyc/${wallet}/${providerId}`,"
        "headers: {"
        "'Content-Type': 'application/json',"
        "'x-api-key': secrets.apiKey"
        "}"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "const dataToEncode = BigInt(data.parsedData);"
        "return Functions.encodeUint256(dataToEncode);";

    /// @notice Cache the account that initialized each API call
    mapping(bytes32 requestId => address account) public requestToAccount;
    /// @notice Cache the provider id of the account that initialized each API call
    mapping(bytes32 requestId => uint256 providerId) public requestToProvider;
    /// @notice Store KYC data of each address in a bitmap
    mapping(address => DataTypes.UserKycMap) public kycData;
    /// @notice Operator permissions to request KYC data
    mapping(address => mapping(address => bool)) public isApprovedOperator;

    constructor(
        uint64 _subscriptionId,
        address _treasury
    ) FunctionsClient(FUNCTIONS_ROUTER) {
        subscriptionId = _subscriptionId;
        treasury = _treasury;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                      API REQUESTS                          */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /// @notice pull KYC data of a user from the API
    /// @dev The contract uses DON-hosted secrets to securely call the API
    /// @param donHostedSecretsSlotID the slot ID where the secrets where stored in the DON
    /// @param donHostedSecretsVersion version of the secret
    /// @param account wallet address to fetch KYC for
    /// @param providerId id of the KYC provider (dependes on what KYC service did the user use)
    function requestKycData(
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        address account,
        uint256 providerId
    ) external returns (bytes32 requestId) {
        // Only the account itself or an approved operator can put the KYC data on-chain
        if (account != msg.sender) {
            if (!isApprovedOperator[account][msg.sender]) revert Unauthorized();
        }

        // Request creator must pay for the LINK costs +fee
        //_pullPayment(account);

        // Initialize request with our source JS code
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);

        // Add the DON secrets parameters to the request
        if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        // Add API call parameters to the request
        req.setArgs(_buildArgs(account, providerId));
        // Process the request
        requestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        // Cache the account and providerId
        assembly ("memory-safe") {
            // requestToAccount[requestId] = account;
            // requestToProvider[requestId] = providerId;
            mstore(0x00, requestId)
            mstore(0x20, requestToAccount.slot)
            sstore(keccak256(0x00, 0x40), account)
            mstore(0x20, requestToProvider.slot)
            sstore(keccak256(0x00, 0x40), providerId)
        }
        emit CreateRequest(requestId, account);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                       KYC GETTERS                          */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /// @notice Get the latest KYC data of a wallet
    /// @return dobYear year of birth of the user
    /// @return isAdult true if the user is at least 18
    /// @return country nationality of the user
    /// @return creditScore off-chain credit score of the user
    /// @return lastUpdatedAt last time this data was updated on chain
    /// @return provider providerId of the KYC provider
    function getLatestKycData(
        address account
    )
        external
        view
        returns (
            uint256 dobYear,
            bool isAdult,
            uint256 country,
            uint256 creditScore,
            uint256 lastUpdatedAt,
            uint256 provider
        )
    {
        DataTypes.UserKycMap memory packedKycData = kycData[account];
        return (
            packedKycData.getYearOfBirth(),
            packedKycData.getIsAdult(),
            packedKycData.getCountry(),
            packedKycData.getCreditScore(),
            packedKycData.getLastUpdatedAt(),
            packedKycData.getProvider()
        );
    }

    /// @notice returns if a wallet has kyc data stored in the contract
    function hasKycData(address account) public view returns (bool) {
        return kycData[account].data != 0;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                       PERMISSIONS                          */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /// @notice Approve someone else to pull KYC data from the API on behalf of you
    function approveOperator(address operator, bool isApproved) external {
        isApprovedOperator[msg.sender][operator] = isApproved;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                       CHAINLINK CALLBACKS                  */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (err.length == 0) {
            uint256 bitmap = abi.decode(response, (uint256));
            DataTypes.UserKycMap memory packedKycData = DataTypes.UserKycMap({
                data: bitmap
            });
            packedKycData.setLastUpdatedAt(block.timestamp);
            packedKycData.setProvider(requestToProvider[requestId]);

            kycData[requestToAccount[requestId]] = packedKycData;
            emit Success(requestId, bitmap);
        } else {
            emit Error(requestId, err);
        }
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                      HELPER FUNCTIONS                      */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /// @dev External helper function for the API
    function parseData(
        uint256 year,
        bool adult,
        uint256 country,
        uint256 score
    ) external pure returns (uint256) {
        DataTypes.UserKycMap memory map;
        map.setYearOfBirth(year);
        map.setIsAdult(adult);
        map.setCountry(country);
        map.setCreditScore(score);
        return map.data;
    }

    function _pullPayment(address _account) internal {
        address(LINK).safeTransferFrom(
            _account,
            address(this),
            SERVICE_COSTS + PROTOCOL_FEE
        );
        LINK.transferAndCall(
            FUNCTIONS_ROUTER,
            SERVICE_COSTS,
            abi.encode(subscriptionId)
        );
        address(LINK).safeTransfer(treasury, PROTOCOL_FEE);
    }

    function _buildArgs(
        address _account,
        uint256 _providerId
    ) internal pure returns (string[] memory) {
        // Convert the values using the library functions
        string memory accountHex = _account.toHexString();
        string memory providerIdStr = _providerId.toString();

        // Allocate memory for the string array
        string[] memory args = new string[](2);

        assembly ("memory-safe") {
            // Store the pointer to the array in memory
            let argsPtr := add(args, 0x20)

            // Store the first string (accountHex) in the array
            mstore(argsPtr, accountHex)

            // Store the second string (providerIdStr) in the array
            mstore(add(argsPtr, 0x20), providerIdStr)
        }

        return args;
    }
}
