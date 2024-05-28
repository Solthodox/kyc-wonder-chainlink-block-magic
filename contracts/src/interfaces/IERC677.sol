// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC677 {
    function transferAndCall(
        address to,
        uint256 value,
        bytes memory data
    ) external returns (bool success);

    function transfer(
        address to,
        uint256 value
    ) external returns (bool success);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool success);

    function balanceOf(address account) external view returns (uint256);
}
