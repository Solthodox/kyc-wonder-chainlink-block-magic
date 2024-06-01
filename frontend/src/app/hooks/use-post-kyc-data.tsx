"use client";

// Import necessary libraries
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { KycData } from "@/types";

/**
 * Function to generate a unique submission ID based on the address.
 *
 * @param address - The wallet address to generate the submission ID for.
 * @returns A unique submission ID string.
 */
const generateUniqueSubmissionId = (address: string): string => {
  return `${address.slice(2, 10)}${Math.floor(Math.random() * 1000000000)}`;
};

/**
 * Custom hook for posting KYC data to a specified URL.
 *
 * @template ErrorType - The type of error expected from the API response, defaulting to AxiosError.
 * @param url - The base URL for the API endpoint.
 * @returns An object containing the success state, error state, loading state, and postData function.
 */
function usePostKycData<ErrorType = AxiosError>(url: string) {
  const [success, setSuccess] = useState<string | null>(null); // Success state as string or null
  const [error, setError] = useState<ErrorType | null>(null); // Error state with generic type
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Asynchronous function to post KYC data to the API.
   *
   * @param postData - The KYC data to be posted.
   */
  const postData = async (postData: KycData) => {
    setLoading(true);
    const {
      name,
      yearOfBirth,
      address,
      country,
      annualIncome,
      bankAccounts,
      creditCards,
      creditHistory,
      creditMix,
      delay,
      delayedPayments,
      loans,
      monthlyBalance,
      outstandingDebt,
      salary,
    } = postData;

    console.log(postData);
    setError(null);

    try {
      const response = await axios.post(
        `${url}/mock-data/data/${address}`,
        {
          name,
          yearOfBirth: yearOfBirth,
          country,
          provider_id: 1,
          submission_id: generateUniqueSubmissionId(address),
          annual_Income: annualIncome,
          monthly_Inhand_Salary: salary,
          num_Bank_Accounts: bankAccounts,
          num_Credit_Cards: creditCards,
          interest_Rate: 4,
          num_Loans: loans,
          delay_From_Due_Date: delay,
          num_Delayed_Payments: delayedPayments,
          credit_Mix: 1,
          outstanding_Debt: outstandingDebt,
          credit_History_Year: 2,
          monthly_Balance: monthlyBalance,
        },
        {
          headers: {
            "x-api-key":
              "947b3345c432d9ef866b76f3938c65a2e7734c1d77f30bb79cc314c4c5ce5a29",
          },
        }
      );
      console.log(response);
      localStorage.setItem("kycPassed", JSON.stringify(true));
      setSuccess("200"); // Success state as string
    } catch (error) {
      console.error(error);
      setError(error as ErrorType); // Set error with generic type
    } finally {
      setLoading(false);
    }
  };

  return { success, error, loading, postData };
}

export default usePostKycData;
