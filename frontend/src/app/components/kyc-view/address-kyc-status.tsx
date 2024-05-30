"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import {
  baseApiUrl,
  donHostedSecretsSlot,
  donHostedSecretsVersion,
  IKycAggregatorABI,
  kycAggregatorAddress,
} from "../../../../statics";
import { type LatestKycData } from "@/types";
import usePostKycAddress from "@/app/hooks/use-post-kyc-address";

interface Props extends ComponentPropsWithoutRef<"tr"> {
  mainAddress: `0x${string}`;
  address: `0x${string}`;
  permission: string;
}

/**
 * AddressKycStatus component displays the KYC status for a given address
 * and allows users to activate on-chain KYC data.
 *
 * @param props - React component props for a <tr> element.
 */
export const AddressKycStatus: FC<Props> = ({
  mainAddress,
  address,
  permission,
}) => {
  // Hook to read on-chain KYC data for the given address
  const { data: onChainKycData } = useReadContract({
    address: kycAggregatorAddress as unknown as `0x${string}`,
    abi: IKycAggregatorABI,
    functionName: "hasKycData",
    args: [address],
  });

  // Cast to avoid TS compiler warning
  const hasKycData = Boolean(onChainKycData) as boolean;
  // Hook to write to the contract, requesting KYC data
  const { writeContract } = useWriteContract();

  const { success, error, loading, postAddress } =
    usePostKycAddress(baseApiUrl);

  const kycModal = document.getElementById(
    "kyc_modal"
  ) as HTMLDialogElement | null;

  /**
   * Handle form submission to request KYC data activation.
   *
   * @param event - Form submission event.
   */
  const handleClick = async (): Promise<void> => {
    console.log("activate");
    // Link the address to the main address in the bakcend
    postAddress({
      mainAddress,
      newAddress: address,
    });
    // Fetch new KYC data on-chain
    https: writeContract({
      address: kycAggregatorAddress as unknown as `0x${string}`,
      abi: IKycAggregatorABI,
      functionName: "requestKycData",
      args: [donHostedSecretsSlot, donHostedSecretsVersion, address, "1"],
    });
  };

  return (
    <tr>
      {/* Display truncated wallet address */}
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" />
          </div>
        </div>
        {address.slice(0, 4)}...{address.slice(37, 42)}
      </td>

      {/* Display permission with conditional styling for Admin */}
      <td className={permission === "Admin" ? "text-primary" : ""}>
        {permission}
      </td>

      {/* Display on-chain KYC status and activation button */}
      <td>
        {hasKycData ? (
          <>Yes</>
        ) : (
          <>
            <button
              onClick={() => kycModal?.showModal()}
              className="bg-secondary text-primary border rounded-sm px-4"
            >
              Activate
            </button>
            <dialog id="kyc_modal" className="modal">
              <div className="modal-box text-base-300">
                <h3 className="font-bold text-lg">{address}</h3>
                <p className="py-4">
                  Please switch to the selected address to execute the
                  transaction. You will now push the new identity to the KYC
                  oracle. This will take a few seconds as the oracle needs to
                  fetch your KYC from the API
                </p>
                <div className="modal-action">
                  <button onClick={handleClick} className="btn">
                    Activate
                  </button>
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        )}
      </td>
    </tr>
  );
};
