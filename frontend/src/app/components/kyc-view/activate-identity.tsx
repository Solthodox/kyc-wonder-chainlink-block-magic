"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  donHostedSecretsSlot,
  donHostedSecretsVersion,
  IKycAggregatorABI,
  kycAggregatorAddress,
} from "../../../../statics";
import { SuccessIconFill } from "@/ui/icons";

interface Props extends ComponentPropsWithoutRef<any> {
  connectedAddress: `0x${string}`;
  isAddressConnected: boolean;
}

/**
 * AddressKycStatus component displays the KYC status for a given address
 * and allows users to activate on-chain KYC data.
 *
 * @param props - React component props for a <tr> element.
 */
export const ActivateIdentity: FC<Props> = (props: Props) => {
  // Hook to write to the contract, requesting KYC data
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { connectedAddress, isAddressConnected } = props;

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  /**
   * Handle form submission to request KYC data activation.
   *
   * @param event - Form submission event.
   */
  const handleClick = async (): Promise<void> => {
    console.log("activate");
    console.log(isAddressConnected);
    console.log(connectedAddress);

    // Fetch new KYC data on-chain
    writeContract({
      address: kycAggregatorAddress as unknown as `0x${string}`,
      abi: IKycAggregatorABI,
      functionName: "requestKycData",
      args: [
        donHostedSecretsSlot,
        donHostedSecretsVersion,
        connectedAddress,
        "1",
      ],
    });
  };

  return (
    <>
      <button
        onClick={() => document.getElementById("kyc_modal")?.showModal()}
        className="bg-primary text-white py-1 border px-4"
      >
        Activate
      </button>
      <dialog id="kyc_modal" className="modal">
        <div className="modal-box text-black">
          <h3 className="font-bold text-lg">{connectedAddress}</h3>
          <p className="py-4">
            Please switch to the selected address to execute the transaction to
            proof the ownership of the address. You will now push the new
            identity to the KYC oracle. This will take a few seconds as the
            oracle needs to fetch your KYC from the API
          </p>

          {(isConfirming || isPending) && (
            <>
              <span className="loading loading-ring loading-xs"></span>
              <span>Fetching identity from the oracle...</span>
            </>
          )}

          {isConfirmed && (
            <>
              <span className="flex items-center">
                Identity added to the oracle{" "}
                <SuccessIconFill className="fill-success ml-2" />
              </span>
              <span className="font-semibold my-2">
                Wait a few seconds for the DON to finalize the request{" "}
              </span>
            </>
          )}
          <div className="modal-action">
            {!isConfirmed && isAddressConnected && (
              <button
                disabled={isConfirming || isPending}
                onClick={handleClick}
                className="btn bg-primary text-base-300 hover:bg-purple-200"
              >
                {isConfirming || isPending ? "Loading..." : "Activate"}
              </button>
            )}
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
