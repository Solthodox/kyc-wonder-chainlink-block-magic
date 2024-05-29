// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {KycAggregator} from "src/KycAggregator.sol";
import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";

contract MockKycAggregator is KycAggregator {
    constructor(
        uint64 _subscriptionId,
        address _treasury
    ) KycAggregator(_subscriptionId, _treasury) {}

    function fulfill(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) external {
        fulfillRequest(requestId, response, err);
    }
}

contract KycAggregatorTest is Test {
    using SafeTransferLib for address;

    event CreateRequest(bytes32 indexed requestId, address indexed account);

    address constant LINK = 0xE4aB69C077896252FAFBD49EFD26B5D171A32410;
    address alice = makeAddr("alice");
    uint256 chainFork;
    MockKycAggregator public oracle;

    function setUp() public {
        chainFork = vm.createSelectFork(vm.envString("RPC_OPTIMISM_SEPOLIA"));
        vm.rollFork(12_558_692);
        oracle = new MockKycAggregator(12, alice);
        deal(LINK, alice, 100 ether);
        vm.startPrank(alice);
        LINK.safeApprove(address(oracle), type(uint256).max);
    }

    function test_request_kyc_data() public {
        /*  vm.expectEmit();
        emit CreateRequest(0, alice); */
        bytes32 requestId = oracle.requestKycData(0, 2343, alice, 1);
        assertEq(oracle.requestToAccount(requestId), alice);
        assertEq(oracle.requestToProvider(requestId), 1);
    }

    function test_fulfill_request() public {
        bytes32 requestId = oracle.requestKycData(0, 2343, alice, 1);
        oracle.fulfill(requestId, abi.encode(328943), "");
        assertEq(oracle.kycData(alice), 328943);
    }
}
