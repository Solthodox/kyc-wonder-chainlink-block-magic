// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IKycAggregator {
    function requestKycData(
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        address account,
        uint256 providerId
    ) external returns (bytes32 requestId);

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
        );

    function approveOperator(address operator, bool isApproved) external;

    function hasKycData(address wallet) external view returns (bool);

    function parseData(
        uint256 year,
        bool adult,
        uint256 country,
        uint256 score
    ) external pure returns (uint256);
}
