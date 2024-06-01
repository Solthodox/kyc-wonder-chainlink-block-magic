# KycWonder

![Kyc Wonder Sheme](/img/kyc-wonder-scheme.png)

KycWonder is an on-chain KYC oracle protocol that maps public KYC data to an Ethereum address. This system ensures that no sensitive KYC data is stored on-chain, only specific fields such as year of birth, isAdult status, country, credit score, and the timestamp of the last update. The goal is to create a transparent and anonymous KYC system that maintains user privacy and allows multiple wallet addresses to be linked to the same KYC data.

## Introduction

In the rapidly evolving world of decentralized finance (DeFi), regulatory compliance and Know Your Customer (KYC) processes are becoming increasingly important. For institutional money to enter the DeFi space, robust KYC protocols are essential. Traditional financial (TradFi) instruments such as loans, insurance, and derivatives require a high level of trust and regulatory compliance, which can be facilitated by KYC processes.

By implementing KYC on-chain, we can bring the advantages of blockchain technology—transparency, immutability, and decentralization—to the KYC process. On-chain KYC ensures that compliance information is easily accessible, verifiable, and tamper-proof, making it easier for institutions to participate in DeFi. Additionally, having KYC data on-chain paves the way for the seamless integration of TradFi instruments into the blockchain ecosystem, fostering innovation and expanding the reach of financial services.

However, storing KYC data on-chain presents challenges, particularly around privacy and data security. KycWonder addresses these issues by storing only non-sensitive KYC fields on-chain and ensuring data homogeneity to protect user privacy. Our Identity-Mixer feature further enhances anonymity by allowing users to link multiple wallet addresses to their KYC data without showing any relationship between those wallets on-chain, making it impossible to distinguish between a completely new kyc person and already kyc-d person that created a new identity.

## Table of Contents

- [KycWonder](#kycwonder)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Architecture](#architecture)
    - [Data Fields Stored On-Chain](#data-fields-stored-on-chain)
    - [Prerequisites](#prerequisites)
  - [Usage](#usage)
    - [Passing KYC and Storing Data](#passing-kyc-and-storing-data)
    - [Switching identities](#switching-identities)
  - [Importance of Credit Score](#importance-of-credit-score)
  - [Security and Privacy](#security-and-privacy)
  - [Deployment addresses](#deployment-addresses)
  - [License](#license)

## Features

- **On-Chain KYC Data**: Stores only non-sensitive KYC fields on-chain for transparency and privacy.
- **Anonymous KYC System**: Ensures homogeneity in on-chain KYC data to prevent linking to real identities.
- **Identity-Mixer**: Allows users to link multiple Ethereum addresses to their KYC data to enhance anonymity.
- **Chainlink Functions Integration**: Uses Chainlink Functions to securely fetch and verify KYC data from the off-chain KycWonder backend.
- **Credit Score Calculation**: Utilizes off-chain financial data and machine learning models to compute users' credit scores, which are then stored in the oracle.

## Architecture

1. **KycWonder Backend**: Manages full KYC data off-chain and maps it to user Ethereum addresses.
2. **Smart Contract**: Stores public KYC data fields on-chain and provides functions to fetch and update this data.
3. **Chainlink Functions**: Facilitates secure and reliable communication between the smart contract and the KycWonder backend.

### Data Fields Stored On-Chain

- `yearOfBirth`: year of birth of the person
- `isAdult`: true if that person is +18
- `country`:
- `creditScore`: 0,1 or 2 from best to worst
- `lastUpdatedAt`: timestamp of last API request from the contract

### Prerequisites

- Node.js
- npm
- Python
- pip
- Foundry (for smart contract development)
- Solidity (for smart contract coding)

## Usage

### Passing KYC and Storing Data

1. **Complete KYC**: User completes the KYC process off-chain through an external KYC provider in KycWonder's interface.
2. **Map KYC Data to Address**: KycWonder backend maps the KYC data to the user's Ethereum address.
3. **Fetch KYC Data On-Chain**: User calls the smart contract function to fetch and store public KYC data on-chain.

### Switching identities

1. **Link New Address**: User can link a new Ethereum address to their existing KYC data without the need to pass KYC again
2. **Fetch KYC Data for New Address**: User calls the smart contract function to fetch and store the KYC data for the new address.

## Importance of Credit Score

- **Risk Assessment**: Credit scores provide a reliable measure of a user's creditworthiness, helping lenders assess the risk of lending to a particular user.
- **Loan Approval**: Higher credit scores can facilitate quicker loan approvals and better interest rates.
- **Integration with** DeFi: Credit scores can be used in DeFi protocols for issuing loans, setting collateral requirements, and determining interest rates.
- **TradFi Instrument** Integration: Having credit scores on-chain allows for seamless integration of traditional financial instruments, making the blockchain ecosystem more robust and versatile.

## Security and Privacy

- **Homogeneous Data**: Ensure on-chain KYC data fields are homogenous across users to prevent linking to real identities.
- **Multiple Addresses**: Allow users to map multiple addresses to their KYC data to enhance anonymity.
- **Secure Data Fetching**: Utilize Chainlink Functions for secure and reliable off-chain data fetching.

## Deployment addresses

| NAME               | URL                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Kyc Oracle         | https://sepolia-optimism.etherscan.io/address/0x068251617f0c1851a75c109f3d114462a3a3c2f7 |
| Frontend           | https://kyc-wonder-chainlink-block-magic.vercel.app/                                     |
| Identity Mixer     | https://kycworker.kycwonder.workers.dev"                                                 |
| Credit Score Model | http://13.49.227.187/                                                                    |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
