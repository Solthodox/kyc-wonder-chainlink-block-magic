# KycAggregator Contract

The `KycAggregator` contract is an on-chain anonymous KYC oracle that interacts with Chainlink's decentralized oracle network (DON) to fetch and store KYC data securely. This contract leverages Chainlink's FunctionsClient for making secure API calls, and it supports multi-chain operations.

## Table of Contents

- [KycAggregator Contract](#kycaggregator-contract)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Deployment](#deployment)
  - [Usage](#usage)
    - [Approve Operator](#approve-operator)
    - [Request KYC Data](#request-kyc-data)
    - [Get Latest KYC Data](#get-latest-kyc-data)
    - [Broadcast KYC Data](#broadcast-kyc-data)
  - [Functions](#functions)
    - [`requestKycData`](#requestkycdata)
    - [`getLatestKycData`](#getlatestkycdata)
    - [`broadcastKYC`](#broadcastkyc)
  - [Events](#events)
  - [Credits](#credits)
  - [License](#license)

## Introduction

The `KycAggregator` contract enables the on-chain retrieval and storage of KYC data. By using Chainlink's decentralized oracle network (DON), the contract ensures secure and reliable API calls to fetch KYC data while maintaining user anonymity.

## Features

- **Anonymous KYC Data**: Securely fetch and store KYC data on-chain without revealing user identity.
- **Chainlink Integration**: Utilizes Chainlink's FunctionsClient for secure API calls.
- **Multi-Chain Support**: Capable of broadcasting KYC data across multiple blockchains.
- **Operator Approval**: Allows users to delegate KYC data requests to approved operators.

## Prerequisites

- Solidity ^0.8.19
- Chainlink FunctionsClient library
- Deployed Chainlink oracle for the specified network
- KYC API endpoint with secure access

## Deployment

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Solthodox/kyc-wonder-chainlink-block-magic.git
    cd KycAggregator/contracts
    ```

2. **Install dependencies**:
    Ensure you have the required dependencies installed, such as the Chainlink FunctionsClient library.

    ```
    forge b
    ```

3. **Deploy the contract**:
    Deploy the contract to your desired Ethereum network (e.g., Optimism Sepolia) using Foundry.

    Create and fill a `.env` file following the example in `.env.example`.
    ```
    source .env
    ```
    ```
    forge create --rpc-url $RPC_OPTIMISM_SEPOLIA \
        --constructor-args $FUNCTIONS_SUBSCRIPTION_ID $TREASURY \
        --private-key $PRIVATE_KEY \
        --etherscan-api-key $ETHERSCAN_API_KEY \
        --verify \
        src/KycAggregator.sol:KycAggregator
    ```

## Usage

### Approve Operator

Approve an operator to request KYC data on your behalf.

```solidity
function approveOperator(address operator, bool isApproved) external
```

### Request KYC Data

Request KYC data for a specific account and provider ID. The contract will request the KYC data to the identity mixer endpoint using Chainlink Functions.

```solidity
function requestKycData(
    uint8 donHostedSecretsSlotID,
    uint64 donHostedSecretsVersion,
    address account,
    uint256 providerId
) external returns (bytes32 requestId)
```

### Get Latest KYC Data

Retrieve the latest cached KYC data for a specific account.

```solidity
function getLatestKycData(
    address account
) external view returns (
    uint256 dobYear,
    bool isAdult,
    uint256 country,
    uint256 creditScore,
    uint256 lastUpdatedAt,
    uint256 provider
)
```

### Broadcast KYC Data

Broadcast KYC data to another chain using CCIP.

```solidity
function broadcastKYC(uint64 _chainId, address account) external payable
```

## Functions

### `requestKycData`

- **Description**: Requests KYC data for a given account and provider ID using Chainlink's DON.
- **Parameters**:
  - `donHostedSecretsSlotID` (uint8): Slot ID for DON-hosted secrets.
  - `donHostedSecretsVersion` (uint64): Version of the secret.
  - `account` (address): Wallet address to fetch KYC data for.
  - `providerId` (uint256): ID of the KYC provider.
- **Returns**: `bytes32` requestId.

### `getLatestKycData`

- **Description**: Retrieves the latest KYC data for a specified account.
- **Parameters**:
  - `account` (address): Wallet address to fetch KYC data for.
- **Returns**: Tuple containing the year of birth, adult status, country, credit score, last update timestamp, and provider ID.

### `broadcastKYC`

- **Description**: Broadcasts KYC data to a specified chain.
- **Parameters**:
  - `chainId` (uint64): ID of the target chain.
  - `account` (address): Wallet address to fetch KYC data for.

## Events

- `CreateRequest(bytes32 indexed requestId, address indexed account)`
- `Success(bytes32 indexed requestId, uint256 indexed kycMap)`
- `Error(bytes32 indexed requestId, bytes err)`

## Credits

This contract leverages the Chainlink FunctionsClient library and is inspired by the open-source community. Special thanks to [Chainlink](https://chain.link/) for their robust oracle solutions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
