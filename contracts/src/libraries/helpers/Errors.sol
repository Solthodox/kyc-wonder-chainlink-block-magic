// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library Errors {
    // Custom error type
    error UnexpectedRequestID(bytes32 requestId);

    error InvalidCountryCode();
    error InvalidYear();
    error InvalidScore();
}
