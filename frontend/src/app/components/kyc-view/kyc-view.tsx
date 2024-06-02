"use client";
import { Key, FC, useState } from "react";
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
import { parseCountry } from "./parse-country";
import { SuccessIconFill, WarningIcon } from "@/ui/icons";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

/**
 * The KycView component fetches and displays KYC and identity information
 * for the connected wallet address.
 *
 * @param props - React component props for a <div> element.
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

  const [newIdentity, setNewIdentity] = useState<string>("");

  const {
    success: successPostAddress,
    error: errorPostAddress,
    loading: loadingPostAddress,
    postAddress,
  } = usePostKycAddress(baseApiUrl);

  const handleClick = async (newIdentity: string): Promise<void> => {
    console.log("add identity");
    if (identities) {
      // Link the address to the main address in the bakcend
      postAddress({
        mainAddress: identities[0].address,
        newAddress: newIdentity,
      });
    }
  };
  const latestKycData = onChainKycData as unknown as LatestKycData;

  return (
    <div className="mb-8">
      <h3 className="flex">
        Powered by{" "}
        <span className="font-bold ml-2 flex items-center text-blue-600">
          Chainlink Functions
          <img
            className="h-5 w-5 ml-2"
            src="https://cryptologos.cc/logos/chainlink-link-logo.png"
          />
        </span>
      </h3>
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
            <div className="card card-side shadow-xl">
              <figure>
                <img src="https://scx2.b-cdn.net/gfx/news/hires/2018/hack.jpg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">On-chain KYC data</h2>
                <p>Address: {address}</p>
                <p>
                  Year of birth: {latestKycData && Number(latestKycData[0])}
                </p>
                <p>Adult: {latestKycData && latestKycData[1].toString()}</p>
                <p>
                  Country:{" "}
                  {latestKycData && parseCountry(Number(latestKycData[2]))}
                </p>
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
      {/* Warning message */}
      <div className="rounded-md bg-warning p-4 flex mb-16" role="alert">
        <WarningIcon className="fill-white mr-4" />
        <p>
          Avoid using the same identity for extended periods to enhance privacy.
        </p>
      </div>
      {/* Identities Section */}
      <h2 className="mt-16 text-xl font-bold mb-4">Your Identities:</h2>
      {loading && <span className="loading loading-ring loading-xs"></span>}
      {success && (
        <>
          <table className="min-w-full table mt-4 overflow-hidden">
            <thead>
              <tr>
                <th>Address</th>
                <th>Permission</th>
                <th>Active on-chain</th>
              </tr>
            </thead>
            <tbody>
              {/* Render identity rows */}
              {identities?.map((identity: { address: string }, index: Key) => (
                <AddressKycStatus
                  key={index}
                  address={identity.address as `0x${string}`}
                  permission={index === 0 ? "Admin" : "Secondary"}
                  isConnected={
                    identity.address.toLowerCase() === address?.toLowerCase()
                  }
                />
              ))}
            </tbody>
          </table>
          <button
            onClick={() => document.getElementById("add_address")?.showModal()}
            className=" my-8 text-white py-2 bg-primary text-lg border rounded-sm px-4"
          >
            New Identity
          </button>
          <dialog id="add_address" className="modal">
            <div className="modal-box text-black">
              <h3 className="font-bold  text-lg">Add a new identity</h3>
              <p className="py-4 ">
                Add the address that will be added to the list of identities.
              </p>
              <input
                className="input w-full"
                type="text"
                placeholder="Enter new address"
                onChange={(e) => {
                  setNewIdentity(e.target.value);
                }}
              />
              {loadingPostAddress === true && (
                <>
                  <span className="loading loading-ring loading-xs"></span>
                  <span>Calling the identity mixer API...</span>
                </>
              )}

              {successPostAddress === "200" && (
                <>
                  <span className="flex items-center">
                    Address added to the identity mixer{" "}
                    <SuccessIconFill className="fill-success ml-2" />
                  </span>
                </>
              )}
              {errorPostAddress && (
                <div className="bg-error p-2">Opps! Something went wrong</div>
              )}

              <div className="modal-action">
                {!successPostAddress && (
                  <button
                    disabled={loadingPostAddress}
                    onClick={() => {
                      handleClick(newIdentity);
                    }}
                    className="btn bg-primary text-base-300"
                  >
                    Add Address
                  </button>
                )}
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}
      {error && (
        <div className="rounded-md bg-error p-4">
          Could not fetch any identities
        </div>
      )}
    </div>
  );
};
