// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library DataTypes {
    //bit 0-11: Year of Birth
    //bit 12-13: Is over 18
    //bit 14-23: Country
    //bit 24-31: Credit Score
    //bit 32-95: Last Updated Timestamp
    //bit 96-255: Providers
    struct UserKycMap {
        uint256 data;
    }
}
