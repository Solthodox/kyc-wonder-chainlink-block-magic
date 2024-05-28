// Import necessary libraries for interacting with wallets and blockchain networks
import { http, createConfig } from 'wagmi' // Wagmi library for interacting with wallets
import { optimismSepolia } from 'wagmi/chains' // Configuration for Optimism Sepolia network

// Import specific connectors for connecting to wallets
import { injected, metaMask, safe } from 'wagmi/connectors'

// Create a Wagmi configuration object
export const config = createConfig({
  // Define the networks to support
  chains: [optimismSepolia],

  // Define supported wallet connectors
  connectors: [injected(), metaMask(), safe()],

  // Configure transport for the specified network (Optimism Sepolia in this case)
  transports: {
    [optimismSepolia.id]: http() // Use HTTP transport for Optimism Sepolia
  }
})
