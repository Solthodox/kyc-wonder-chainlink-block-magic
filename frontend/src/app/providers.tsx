"use client";
// Import necessary providers for wallet connection, data fetching, and UI elements
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config"; // Import Wagmi configuration

// Interface for child components
interface ProvidersProps {
  children: ReactNode;
}

// Create a new QueryClient instance for data fetching
const queryClient = new QueryClient();

/**
 * Component responsible for wrapping the application with necessary providers.
 *
 * @param props - The properties for the Providers component.
 * @returns The JSX for wrapping the application with providers.
 */
const Providers = (props: ProvidersProps): JSX.Element => {
  const { children } = props;

  // Wrap the application with Wagmi provider for wallet interaction (uses config)
  return (
    <WagmiProvider config={config}>
      {/* Provider for data fetching and caching with QueryClient */}
      <QueryClientProvider client={queryClient}>
        {/* RainbowKit provider for wallet connection UI with dark theme configuration */}
        <RainbowKitProvider
          showRecentTransactions={true} // Enable displaying recent transactions
        >
          {/* Pass children components to be wrapped by the providers */}
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
