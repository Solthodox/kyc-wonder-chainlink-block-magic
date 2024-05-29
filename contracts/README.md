# Compile
```
yarn
```
```
forge b
```
# Deploy
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