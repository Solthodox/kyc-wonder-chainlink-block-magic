"use client";
import classNames from "classnames";
import { useState } from "react";
import { type ComponentPropsWithoutRef, type FC } from "react";

import Datepicker from "react-tailwindcss-datepicker";
import { useAccount } from "wagmi";
import Link from "next/link";
import usePostKycData from "@/app/hooks/use-post-kyc-data";
import { baseApiUrl, countries } from "../../../../statics";

interface Props extends ComponentPropsWithoutRef<"form"> {}

/**
 * Form component for submitting KYC and credit score data.
 *
 * @param props - React component props for a <form> element.
 */
export const Form: FC<Props> = (props) => {
  const { className } = props;

  // Wallet data
  const { address } = useAccount();
  // Post hook
  const { success, error, loading, postData } = usePostKycData(baseApiUrl);

  // KYC
  const [name, setName] = useState<string | null>(null);
  const [yearOfBirth, setYearOfBirth] = useState<string | any>(null);
  const [country, setCountry] = useState<string | null>(null);

  // Credit Score
  const [annualIncome, setAnnualIncome] = useState<string | null>(null);
  const [salary, setSalary] = useState<string | null>(null);
  const [bankAccounts, setBankAccounts] = useState<string | null>(null);
  const [creditCards, setCreditCards] = useState<string | null>(null);
  const [loans, setLoans] = useState<string | null>(null);
  const [delay, setDelay] = useState<string | null>(null);
  const [delayedPayments, setDelayedPayments] = useState<string | null>(null);
  const [creditMix, setCreditMix] = useState<string | null>(null);
  const [outstandingDebt, setOutstandingDebt] = useState<string | null>(null);
  const [creditHistory, setCreditHistory] = useState<string | null>(null);
  const [monthlyBalance, setMonthlyBalance] = useState<string | null>(null);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(" ---------- ", name);
    // Simulate form submission here (e.g., send data to backend)
    postData({
      name: name as string,
      yearOfBirth: yearOfBirth as string,
      address: address as `0x${string}`,
      country: country as string,
      annualIncome: annualIncome as string,
      salary: salary as string,
      bankAccounts: bankAccounts as string,
      creditCards: creditCards as string,
      loans: loans as string,
      delay: delay as string,
      delayedPayments: delayedPayments as string,
      creditMix: creditMix as string,
      outstandingDebt: outstandingDebt as string,
      creditHistory: creditHistory as string,
      monthlyBalance: monthlyBalance as string,
    });

    // setName(null);
    // setYearOfBirth(null);
    // setCountry(null);
    // setAnnualIncome(null);
    // setSalary(null);
    // setBankAccounts(null);
    // setCreditCards(null);
    // setLoans(null);
    // setDelay(null);
    // setDelayedPayments(null);
    // setCreditMix(null);
    // setOutstandingDebt(null);
    // setCreditHistory(null);
    // setMonthlyBalance(null);
  };

  return (
    <form onSubmit={handleSubmit} className={classNames("py-4 px-6 mt-6")}>
      <h2 className="font-bold text-xl mb-4">KYC data:</h2>

      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="city" className="block text-sm font-medium ">
          Name
        </label>
        <div className="mt-1">
          <input
            required
            type="text"
            id="name"
            name="name"
            autoComplete="Paco Flores"
            className=" w-full input input-bordered w-full "
            value={name as string}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="address" className="block text-sm font-medium ">
          Address
        </label>
        <div className="mt-1">
          {address ? (
            <span className="ml-4">{address}</span>
          ) : (
            <span className="ml-4 text-warning">
              Please connect your wallet.
            </span>
          )}
        </div>
      </div>
      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="yearOfBirth" className="block text-sm font-medium ">
          Year of Birth:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="name"
            name="name"
            className=" w-full input input-bordered w-full "
            placeholder="Enter annual income"
            value={yearOfBirth as string}
            onChange={(e) => setYearOfBirth(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="address" className="block text-sm font-medium ">
          Country:
        </label>
        <div className="mt-1">
          <select
            value={country as string}
            onChange={(e) => setCountry(e.target.value)}
            className="select select-bordered w-full max-w-xs"
            id="country"
            name="country"
          >
            {countries.map((country, index) => (
              <option
                className="cursor-pointer"
                key={index}
                value={country.code as string}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="w-full border-t border-base-100 mt-4 mb-4" />
      <h2 className="font-bold mt-16 text-xl mb-4">Credit Score:</h2>
      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="anualIncome" className="block text-sm font-medium ">
          Annual income:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="name"
            name="name"
            className=" w-full input input-bordered w-full "
            placeholder="Enter annual income"
            value={annualIncome as string}
            onChange={(e) => setAnnualIncome(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-full sm:col-span-4 py-4">
        <label
          htmlFor="monthlyInhandSalary"
          className="block text-sm font-medium "
        >
          Monthly inhand salary:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="10000$"
            placeholder="Enter monthly salary"
            className=" w-full input input-bordered w-full "
            value={salary as string}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
      </div>

      <div className="col-span-full sm:col-span-4 py-4">
        <label
          htmlFor="monthlyInhandSalary"
          className="block text-sm font-medium "
        >
          Number of bank accounts:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            placeholder="Enter number of bank accounts"
            className=" w-full input input-bordered w-full "
            value={bankAccounts as string}
            onChange={(e) => setBankAccounts(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Number of credit cards:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            placeholder="Enter how many credit cards you own"
            className=" w-full input input-bordered w-full "
            value={creditCards as string}
            onChange={(e) => setCreditCards(e.target.value)}
          />
        </div>
      </div>

      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Number of Loans:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            placeholder="Enter how many loans you own"
            className=" w-full input input-bordered w-full "
            value={loans as string}
            onChange={(e) => setLoans(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Days of delay from due date:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            placeholder="Enter number of days of delay from due date"
            className=" w-full input input-bordered w-full "
            value={delay as string}
            onChange={(e) => setDelay(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Number of delayed payments:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            placeholder="Enter Number of delayed payments"
            className=" w-full input input-bordered w-full "
            value={delayedPayments as string}
            onChange={(e) => setDelayedPayments(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Credit mix:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            placeholder="Enter Credit mix"
            className=" w-full input input-bordered w-full "
            value={creditMix as string}
            onChange={(e) => setCreditMix(e.target.value)}
          />
        </div>
      </div>

      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Outstanding debt:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="debt"
            name="debt"
            autoComplete="1"
            className=" w-full input input-bordered w-full "
            placeholder="Enter your outstanding debt"
            value={outstandingDebt as string}
            onChange={(e) => setOutstandingDebt(e.target.value)}
          />
        </div>
      </div>

      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Years of credit history:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            className=" w-full input input-bordered w-full "
            placeholder="Enter your years of credit history"
            value={creditHistory as string}
            onChange={(e) => setCreditHistory(e.target.value)}
          />
        </div>
      </div>

      <div className="col-span-full sm:col-span-4 py-4">
        <label htmlFor="creditcards" className="block text-sm font-medium ">
          Monthly balance:
        </label>
        <div className="mt-1">
          <input
            required
            type="number"
            id="salary"
            name="salary"
            autoComplete="1"
            className=" w-full input input-bordered w-full "
            placeholder="Enter your monthly balance"
            value={monthlyBalance as string}
            onChange={(e) => setMonthlyBalance(e.target.value)}
          />
        </div>
      </div>

      <br />
      {loading && !success && address ? (
        <button
          disabled
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Loading...
        </button>
      ) : !success && address ? (
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send KYC
        </button>
      ) : (
        <> Connect Wallet </>
      )}

      {success && (
        <p className="bg-success p-4 mt-4">
          You have been successfully KYCd! Go check your{" "}
          <Link href="/">
            <u>identity dashboard</u>
          </Link>
        </p>
      )}

      {error && (
        <p className="rounded-md bg-error p-4 mt-4">
          It looks like you already passed KYC, you don't need to do it again
        </p>
      )}
    </form>
  );
};
