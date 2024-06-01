"use client";

// Import necessary libraries
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { AddressData } from "@/types";

/**
 * Custom hook for posting KYC addresses to a specified URL.
 *
 * @template ErrorType - The type of error expected from the API response, defaulting to AxiosError.
 * @param url - The base URL for the API endpoint.
 * @returns An object containing the success state, error state, loading state, and postData function.
 */
function usePostKycAddress<ErrorType = AxiosError>(url: string) {
    const [success, setSuccess] = useState<string | null>(null); // Success state as string or null
    const [error, setError] = useState<ErrorType | null>(null); // Error state with generic type
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Asynchronous function to post KYC data to the API.
     *
     * @param postAddress - The KYC address to be linked to a KYC data.
     */
    const postAddress = async (postAddress: AddressData) => {
        setLoading(true);
        const { mainAddress, newAddress } = postAddress;
        setError(null);
        if (mainAddress === newAddress) setSuccess("200");
        else {
            try {
                const response = await fetch(
                    `${url}/user/add-address/${mainAddress}/${newAddress}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key":
                                "947b3345c432d9ef866b76f3938c65a2e7734c1d77f30bb79cc314c4c5ce5a29",
                        },
                    },
                );

                console.log(response);
                setSuccess("200");
            } catch (error) {
                console.error(error);
                setError(error as ErrorType); // Set error with generic type
            } finally {
                setLoading(false);
            }
        }
    };

    return { success, error, loading, postAddress };
}

export default usePostKycAddress;
