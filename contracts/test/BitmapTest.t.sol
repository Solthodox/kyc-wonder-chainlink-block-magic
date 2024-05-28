// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {KycDataMapping, DataTypes} from "src/libraries/KycDataMapping.sol";

contract BitmapTest is Test {
    using KycDataMapping for DataTypes.UserKycMap;

    function test_bitmap_country() public pure {
        DataTypes.UserKycMap memory bitmap;
        bitmap.setCountry(2);
        assertEq(bitmap.getCountry(), 2);
    }

    function test_bitmap_year() public pure {
        DataTypes.UserKycMap memory bitmap;
        bitmap.setYearOfBirth(2004);
        assertEq(bitmap.getYearOfBirth(), 2004);
    }

    function test_bitmap_adult() public pure {
        DataTypes.UserKycMap memory bitmap;
        bitmap.setIsAdult(true);
        assertTrue(bitmap.getIsAdult());
    }

    function test_bitmap_credit_score() public pure {
        DataTypes.UserKycMap memory bitmap;
        bitmap.setCreditScore(2);
        assertEq(bitmap.getCreditScore(), 2);
    }

    function test_bitmap_last_updated_at() public view {
        DataTypes.UserKycMap memory bitmap;
        bitmap.setLastUpdatedAt(block.timestamp);
        assertEq(bitmap.getLastUpdatedAt(), block.timestamp);
    }

    function test_bitmap_provider() public pure {
        DataTypes.UserKycMap memory bitmap;
        bitmap.setProvider(5);
        assertEq(bitmap.getProvider(), 5);
    }
}
