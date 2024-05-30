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
import { parseCreditScore } from "./parse-credit-score";
import usePostKycAddress from "@/app/hooks/use-post-kyc-address";

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

  const { postAddress } = usePostKycAddress(baseApiUrl);

  const identityModal = document.getElementById(
    "identity_modal"
  ) as HTMLDialogElement | null;

  const handleClick = async (addAddress: string): Promise<void> => {
    console.log("add identity");
    if (identities) {
      // Link the address to the main address in the bakcend
      postAddress({
        mainAddress: identities[0],
        newAddress: addAddress,
      });
    }
  };
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
        {loading && <span className="loading loading-ring loading-xs"></span>}
        {/* Success message */}
        {success && (
          <>
            <div className="card card-side p-1 bg-base-300 shadow-xl">
              <figure>
                <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">On-chain KYC data</h2>
                <p>Address: {address}</p>
                <p>
                  Year of birth: {latestKycData && Number(latestKycData[0])}
                </p>
                <p>Adult: {latestKycData && latestKycData[1].toString()}</p>
                <p>Country: {latestKycData && Number(latestKycData[2])}</p>
                <p>
                  CreditScore:{" "}
                  {latestKycData && parseCreditScore(Number(latestKycData[3]))}
                </p>
              </div>
            </div>
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
      <table className="min-w-full table mt-4 overflow-hidden">
        <thead>
          <tr className="">
            <th className="">Address</th>
            <th className="">Permission</th>
            <th className="">Active on-chain</th>
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
      <button
        onClick={() => identityModal?.showModal()}
        className="mt-4 bg-secondary text-primary border rounded-sm px-4 py-2"
      >
        New identity
      </button>

      <dialog id="kyc_modal" className="modal">
        <div className="modal-box text-base-300">
          <h3 className="font-bold text-lg">
            Please introduce new identity address
          </h3>
          <div className="modal-action">
            <button onClick={handleClick} className="btn">
              Add
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
