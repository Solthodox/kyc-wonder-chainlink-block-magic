// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink-ccip/src/v0.8/ccip/libraries/Client.sol";
 
 
import {DataTypes} from "./types/DataTypes.sol";
import {KycDataMapping} from "./libraries/KycDataMapping.sol";

contract BasicMessageReceiver is CCIPReceiver {
    bytes32 latestMessageId;
    uint64 latestSourceChainSelector;
    address latestSender;
    using KycDataMapping for DataTypes.UserKycMap;

    mapping(address => DataTypes.UserKycMap) public kycData;

    event MessageReceived(
        bytes32 latestMessageId,
        uint64 latestSourceChainSelector,
        address latestSender,
        uint256 latestMessage
    );

    constructor(address router) CCIPReceiver(router) {}

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        latestMessageId = message.messageId;
        latestSourceChainSelector = message.sourceChainSelector;
        latestSender = abi.decode(message.sender, (address));
        (uint256 bitmap, address account) = abi.decode(message.data, (uint256, address));
        
        DataTypes.UserKycMap memory packedKycData = DataTypes.UserKycMap({
            data: bitmap
        });
        packedKycData.setLastUpdatedAt(block.timestamp);
        kycData[account] = packedKycData;

        emit MessageReceived(
            latestMessageId,
            latestSourceChainSelector,
            latestSender,
            bitmap
        );
    }

    function getLatestMessageDetails()
        public
        view
        returns (bytes32, uint64, address)
    {
        return (
            latestMessageId,
            latestSourceChainSelector,
            latestSender 
        );
    }

      /// @notice returns if a wallet has kyc data stored in the contract
    function hasKycData(address account) public view returns (bool) {
        return kycData[account].data != 0;
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
}