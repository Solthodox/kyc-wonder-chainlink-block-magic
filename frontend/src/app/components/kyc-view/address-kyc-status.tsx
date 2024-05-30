"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";
import { useReadContract } from "wagmi";
import { IKycAggregatorABI, kycAggregatorAddress } from "../../../../statics";

import { ActivateIdentity } from "./activate-identity";

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

  return (
    <tr>
      {/* Display truncated wallet address */}
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-4 h-4">
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
          <ActivateIdentity mainAddress={mainAddress} address={address} />
        )}
      </td>
    </tr>
  );
};
