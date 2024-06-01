# KYC Worker - README

## Introduction

This project is a backend protocol built using Wrangler, D1, Hono, Drizzle, and Zod. It provides a set of APIs for managing KYC (Know Your Customer) data, user information, and mock provider data. The protocol is designed to be secure, efficient, and easy to use.

## Prerequisites
Before running the project, make sure you have the following installed:

Bun
Wrangler CLI
Cloudflare account

## Installation

Clone the repository:
```bash
$ git clone git@github.com:Solthodox/kyc-wonder-chainlink-block-magic.git
```
Install the dependencies:
```bash
$ cd kycworker
$ bun install
```
Set up the environment variables:

Create a .dev.vars file in the root directory of the project.
Wrangler will use dev.vars for the local deployment; for the Cloudflare deployment, ensure you set the values properly on your worker setting.
Add the following variables to the .dev.vars file:
```bash
RPC_URL=<your_rpc_url>
AUTH_API_KEY=<your_auth_api_key>
FRONT_API_KEY=<your_front_api_key>
```
Replace <your_rpc_url>, <your_auth_api_key>, and <your_front_api_key> with your actual values.

## Configure the D1 database:

Update the wrangler.toml file with your D1 database details:

```bash
[[d1_databases]]
binding = "DB"
database_name = "worker-db"
database_id = "your_database_id"
```
Replace your_database_id with your actual D1 database ID.

Generate the database schema:
```bash
bun run db:generate
```
Apply the database migrations:
```bash
bun run db:up
```

## Usage

Start the development server:
```bash
bun run dev
```
The server will start running at http://localhost:3000.

You can now make API requests to the following endpoints:

#### POST /mock-data/data/:address: Create mock KYC data for a given Ethereum address.

Example request:
```bash
POST https://kycworker.kycwonder.workers.dev/mock-data/data/0x94aBa23b9Bbfe7bb62A9eB8b1215D72b5f6F33a1
Content-Type: application/json
x-api-key: <your_api_key>

{
  "name": "Mfer 1318",
  "yearOfBirth": 1983,
  "country": "PRT",
  "provider_id": 1,
  "submission_id": "678ASF",
  "annual_Income": 12000,
  "monthly_Inhand_Salary": 1000,
  "num_Bank_Accounts": 1,
  "num_Credit_Cards": 1,
  "interest_Rate": 2,
  "num_Loans": 1,
  "delay_From_Due_Date": 100,
  "num_Delayed_Payments": 0,
  "credit_Mix": 1,
  "outstanding_Debt": 2000,
  "credit_History_Year": 2024,
  "monthly_Balance": 1
}
```
returns:
```json
{
  "success": true,
  "data": {
    "success": true,
    "meta": {
      "duration": 123
    }
  }
}
```

#### GET /user/:address: Get user information using the Ethereum address.

Example request:
```bash
GET http://kycworker.kycwonder.workers.dev/user/0x94aBa23b9Bbfe7bb62A9eB8b1215D72b5f6F33a1
x-api-key: <your_api_key>
```
returns:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "address": "0x94aBa23b9Bbfe7bb62A9eB8b1215D72b5f6F33a1",
      "provider_id": 1,
      "client_id": 1,
      "submissionId": "678ASF",
      "yearOfBirth": 1983,
      "countryCode": 620,
      "isAdult": 1,
      "creditScore": 0
    }
  ]
}
```
#### POST /user/add-address/:address/:newAddress: Add a new Ethereum address for a user.

Example request:
```bash
POST https://kycworker.kycwonder.workers.dev/user/add-address/0x94aBa23b9Bbfe7bb62A9eB8b1215D72b5f6F33a1/0x429796dAc057E7C15724196367007F1e9Cff82F9
x-api-key: <your_api_key>
```
returns:
```json
{
  "success": true,
  "result": {
    "success": true,
    "meta": {
      "duration": 123
    }
  }
}
```

#### GET /kyc/:address/:providerId: Get KYC data for a user using the Ethereum address and provider ID.

Example request:
```bash
GET https://kycworker.kycwonder.workers.dev/kyc/0x94aBa23b9Bbfe7bb62A9eB8b1215D72b5f6F33a1/1
x-api-key: <your_api_key>
```
returns:
```json
{
    "parsedData": "40638399"
}
```

Include the x-api-key header in your requests with the appropriate API key (AUTH_API_KEY or FRONT_API_KEY).

## Deployment

To deploy the protocol to Cloudflare Workers, run the following command:
```bash
bun run deploy
```
Ensure you have configured your Cloudflare account and have the necessary permissions to deploy workers.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please create an issue or submit a pull request.

## License
This project is licensed under the MIT License.
