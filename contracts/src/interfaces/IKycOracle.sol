// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { DataTypes} from "../types/DataTypes.sol";

interface IKycOracle {
    function fetchKycData(address account, uint256[] memory broadcastTo) external returns (bytes32 requestId);

    function getKycData(address account) external view returns (DataTypes.UserKycMap memory data);

    function approveOperator(address operator, bool isApproved) external;

    function linkWallet(address wallet) external;
    
    function hasKycData(address wallet) external view returns(bool);
}
