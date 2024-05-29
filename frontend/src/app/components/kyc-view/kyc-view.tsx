"use client";

import { Key, FC } from "react";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import useGetKycData from "@/app/hooks/use-get-kyc-data";
import { AddressKycStatus } from "./address-kyc-status";
import {
  baseApiUrl,
  IKycAggregatorABI,
  kycAggregatorAddress,
} from "../../../../statics";
import { LatestKycData } from "@/types";

interface Props extends React.ComponentPropsWithoutRef<"nav"> {}

/**
 * The KycView component fetches and displays KYC and identity information
 * for the connected wallet address.
 *
 * @param props - React component props for a <nav> element.
 */
export const KycView: FC<Props> = (props) => {
  // Retrieve the current wallet address using wagmi hook
  const { address } = useAccount();

  // Fetch KYC data using a custom hook, passing the base API URL and wallet address
  const { success, error, loading, identities } = useGetKycData(
    baseApiUrl,
    address ? (address as `0x${string}`) : null
  );
  const { data: onChainKycData } = useReadContract({
    address: kycAggregatorAddress as unknown as `0x${string}`,
    abi: IKycAggregatorABI,
    functionName: "getLatestKycData",
    args: [address],
  });

  const latestKycData = onChainKycData as unknown as LatestKycData;

  return (
    <div className="mb-8">
      {/* KYC Section */}
      <h2 className="text-xl font-bold">On-chain KYC:</h2>
      <ul className="mt-4">
        {/* Message to connect wallet if address is not available */}
        {!address && (
          <p className="text-warning">Please connect your wallet.</p>
        )}
        {/* Loading indicator */}
        {loading && <span>Loading...</span>}
        {/* Success message */}
        {success && (
          <>
            <table className="min-w-full mt-4 overflow-hidden">
              <tbody>
                <tr>
                  <td>Address </td>
                  <td>{address}</td>
                </tr>
                <tr>
                  <td>Year of birth</td>
                  <td>{latestKycData && Number(latestKycData[0])}</td>
                </tr>
                <tr>
                  <td>Adult</td>
                  <td>{latestKycData && latestKycData[1].toString()}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{latestKycData && Number(latestKycData[2])}</td>
                </tr>
                <tr>
                  <td>Credit Score</td>
                  <td>{latestKycData && Number(latestKycData[3])}</td>
                </tr>
              </tbody>
            </table>
            {/* Link to view KYC oracle contract on Etherscan */}
            <p className="font-semibold my-4">
              You can see the KYC oracle{" "}
              <a
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://sepolia-optimism.etherscan.io/address/${kycAggregatorAddress}#readContract`}
              >
                here
              </a>
            </p>
          </>
        )}
        {/* Error message with link to KYC form */}
        {error && (
          <li className="text-red-500">
            KYC not passed. Please fill the{" "}
            <Link href="/kyc" className="text-blue-500 underline">
              <u>form</u>
            </Link>
            .
          </li>
        )}
      </ul>
      <hr className="w-full border-t border-base-100 mt-4 mb-4" />
      {/* Identities Section */}
      <h2 className="mt-8 text-xl font-bold">Your Identities:</h2>
      <table className="min-w-full mt-4 overflow-hidden">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-1 px-3 text-left">Address</th>
            <th className="py-1 px-3 text-left">Permission</th>
            <th className="py-1 px-3 text-left">Active on-chain</th>
          </tr>
        </thead>
        <tbody>
          {/* Render identity rows */}
          {identities?.map((identity: { address: string }, index: Key) => (
            <AddressKycStatus
              key={index}
              mainAddress={identities[0]}
              address={identity.address as `0x${string}`}
              permission={index === 0 ? "Admin" : "Secondary"}
            />
          ))}
        </tbody>
      </table>

      {/* Button to add new identity */}
      <button className="mt-4 bg-secondary text-primary border rounded-sm px-4 py-2">
        New identity
      </button>
    </div>
  );
};
