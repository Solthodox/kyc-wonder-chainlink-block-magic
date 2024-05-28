# KycWonder

![Build Status](/img/kyc-wonder-scheme.png)

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
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Usage](#usage)
    - [Passing KYC and Storing Data](#passing-kyc-and-storing-data)
    - [Identity-Mixer](#identity-mixer)
  - [Security and Privacy](#security-and-privacy)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **On-Chain KYC Data**: Stores only non-sensitive KYC fields on-chain for transparency and privacy.
- **Anonymous KYC System**: Ensures homogeneity in on-chain KYC data to prevent linking to real identities.
- **Identity-Mixer**: Allows users to link multiple Ethereum addresses to their KYC data to enhance anonymity.
- **Chainlink Functions Integration**: Uses Chainlink Functions to securely fetch and verify KYC data from the off-chain KycWonder backend.

## Architecture

1. **KycWonder Backend**: Manages full KYC data off-chain and maps it to user Ethereum addresses.
2. **Smart Contract**: Stores public KYC data fields on-chain and provides functions to fetch and update this data.
3. **Chainlink Functions**: Facilitates secure and reliable communication between the smart contract and the KycWonder backend.

### Data Fields Stored On-Chain

- `yearOfBirth`
- `isAdult`
- `country`
- `creditScore`
- `lastUpdatedAt`

## Getting Started

### Prerequisites

- Node.js
- npm
- Truffle or Hardhat (for smart contract development)
- Solidity (for smart contract coding)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/KycWonder.git
   cd KycWonder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Deploy the smart contract**
   ```bash
   truffle migrate --network <network_name>
   ```

### Configuration

- Set up environment variables for Chainlink Functions and backend API keys in a `.env` file.
- Configure network settings in `truffle-config.js` or `hardhat.config.js`.

## Usage

### Passing KYC and Storing Data

1. **Complete KYC**: User completes the KYC process off-chain through KycWonder's interface.
2. **Map KYC Data to Address**: KycWonder backend maps the KYC data to the user's Ethereum address.
3. **Fetch KYC Data On-Chain**: User calls the smart contract function to fetch and store public KYC data on-chain.

   ```solidity
   contract KycWonder {
     function fetchKycData(address userAddress) public {
       // Implementation using Chainlink Functions to fetch data from KycWonder backend
     }
   }
   ```

### Identity-Mixer

1. **Link New Address**: User can link a new Ethereum address to their existing KYC data.
2. **Fetch KYC Data for New Address**: User calls the smart contract function to fetch and store the KYC data for the new address.

   ```solidity
   contract KycWonder {
     function fetchKycDataForNewAddress(address newAddress) public {
       // Implementation to map new address and fetch data
     }
   }
   ```

## Security and Privacy

- **Homogeneous Data**: Ensure on-chain KYC data fields are homogenous across users to prevent linking to real identities.
- **Multiple Addresses**: Allow users to map multiple addresses to their KYC data to enhance anonymity.
- **Secure Data Fetching**: Utilize Chainlink Functions for secure and reliable off-chain data fetching.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README further based on additional details or preferences for your project.
