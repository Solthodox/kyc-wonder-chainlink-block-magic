// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {DataTypes} from "src/types/DataTypes.sol";
import {Errors} from "./helpers/Errors.sol";

library KycDataMapping {
    // @dev each F is x4
    uint256 constant YEAR_OF_BIRTH_MASK         =               ~uint256(0xFFF); // prettier-ignore
    uint256 constant ADULT_MASK                 =               ~(uint256(1) << 12); // prettier-ignore
    uint256 constant COUNTRY_MASK               =               ~(uint256(0xFFF) << 16); // prettier-ignore
    uint256 constant CREDIT_SCORE_MASK          =               ~(uint256(0xF) << 28); // prettier-ignore
    uint256 constant LAST_UPDATED_AT_MASK       =               ~(uint256(0xFFFFFFFFFFFF) << 32); // prettier-ignore
    uint256 constant PROVIDER_MASK              =               ~(uint256(0xFF) << 96); // prettier-ignore
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         BIT POSITIONS                      */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    uint256 constant ADULT_START_BIT_POSITION                   = 12; // prettier-ignore
    uint256 constant COUNTRY_START_BIT_POSITION                 = 16; // prettier-ignore
    uint256 constant CREDIT_SCORE_START_BIT_POSITION            = 28; // prettier-ignore
    uint256 constant LAST_UPDATED_AT_START_BIT_POSITION         = 32; // prettier-ignore
    uint256 constant PROVIDER_START_BIT_POSITION                = 96; // prettier-ignore

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         VALIDATIONS                        */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    uint256 internal constant MAX_VALID_YEAR                    = 5000; // prettier-ignore
    uint256 internal constant MAX_VALID_COUNTRY                 = 893; // prettier-ignore
    uint256 internal constant MAX_VALID_SCORE                   = 3; // prettier-ignore

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         YEAR                               */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function getYearOfBirth(
        DataTypes.UserKycMap memory self
    ) internal pure returns (uint256) {
        return self.data & ~YEAR_OF_BIRTH_MASK;
    }

    function setYearOfBirth(
        DataTypes.UserKycMap memory self,
        uint256 yearOfBirth
    ) internal pure {
        if (yearOfBirth > MAX_VALID_YEAR) revert Errors.InvalidYear();
        self.data = (self.data & YEAR_OF_BIRTH_MASK) | yearOfBirth;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         OVER 18/ADULT                      */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    function getIsAdult(
        DataTypes.UserKycMap memory self
    ) internal pure returns (bool) {
        return (self.data & (1 << ADULT_START_BIT_POSITION)) != 0;
    }

    function setIsAdult(
        DataTypes.UserKycMap memory self,
        bool isAdult
    ) internal pure {
        self.data =
            (self.data & ADULT_MASK) |
            (uint256(isAdult ? 1 : 0) << ADULT_START_BIT_POSITION);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         COUNTRY                            */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function getCountry(
        DataTypes.UserKycMap memory self
    ) internal pure returns (uint256) {
        return (self.data >> COUNTRY_START_BIT_POSITION) & 0xFFF;
    }

    function setCountry(
        DataTypes.UserKycMap memory self,
        uint256 countryCode
    ) internal pure {
        if (countryCode > MAX_VALID_COUNTRY) revert Errors.InvalidCountryCode();
        self.data =
            (self.data & COUNTRY_MASK) |
            (countryCode << COUNTRY_START_BIT_POSITION);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         CREDIT SCORE                       */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function getCreditScore(
        DataTypes.UserKycMap memory self
    ) internal pure returns (uint256) {
        return (self.data >> CREDIT_SCORE_START_BIT_POSITION) & 0xF;
    }

    function setCreditScore(
        DataTypes.UserKycMap memory self,
        uint256 creditScore
    ) internal pure {
        if (creditScore > MAX_VALID_SCORE) revert Errors.InvalidScore();
        self.data =
            (self.data & CREDIT_SCORE_MASK) |
            (creditScore << CREDIT_SCORE_START_BIT_POSITION);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         LAST UPDATE                        */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function getLastUpdatedAt(
        DataTypes.UserKycMap memory self
    ) internal pure returns (uint256) {
        return
            (self.data >> LAST_UPDATED_AT_START_BIT_POSITION) & 0xFFFFFFFFFFFF;
    }

    function setLastUpdatedAt(
        DataTypes.UserKycMap memory self,
        uint256 lastUpdatedAt
    ) internal pure {
        self.data =
            (self.data & LAST_UPDATED_AT_MASK) |
            (lastUpdatedAt << LAST_UPDATED_AT_START_BIT_POSITION);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         PROVIDER                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    function getProvider(
        DataTypes.UserKycMap memory self
    ) internal pure returns (uint256) {
        return (self.data >> PROVIDER_START_BIT_POSITION) & 0xFF;
    }

    function setProvider(
        DataTypes.UserKycMap memory self,
        uint256 provider
    ) internal pure {
        self.data =
            (self.data & PROVIDER_MASK) |
            (provider << PROVIDER_START_BIT_POSITION);
    }
}
