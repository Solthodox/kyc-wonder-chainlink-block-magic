'use client'
import classNames from 'classnames'
import { useState } from 'react'
import { type ComponentPropsWithoutRef, type FC } from 'react'

import { useAccount } from 'wagmi'
import Link from 'next/link'
import usePostKycData from '@/app/hooks/use-post-kyc-data'
import { baseApiUrl, countries } from '../../../../statics'

interface Props extends ComponentPropsWithoutRef<'form'> {}

/**
 * Form component for submitting KYC and credit score data.
 *
 * @param props - React component props for a <form> element.
 */
export const Form: FC<Props> = props => {
  const { className } = props

  // Wallet data
  const { address } = useAccount()
  // Post hook
  const { success, error, loading, postData } = usePostKycData(baseApiUrl)

  // KYC
  const [name, setName] = useState<string | null>(null)
  const [yearOfBirth, setYearOfBirth] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)

  // Credit Score
  const [annualIncome, setAnnualIncome] = useState<string | null>(null)
  const [salary, setSalary] = useState<string | null>(null)
  const [bankAccounts, setBankAccounts] = useState<string | null>(null)
  const [creditCards, setCreditCards] = useState<string | null>(null)
  const [loans, setLoans] = useState<string | null>(null)
  const [delay, setDelay] = useState<string | null>(null)
  const [delayedPayments, setDelayedPayments] = useState<string | null>(null)
  const [creditMix, setCreditMix] = useState<string | null>(null)
  const [outstandingDebt, setOutstandingDebt] = useState<string | null>(null)
  const [creditHistory, setCreditHistory] = useState<string | null>(null)
  const [monthlyBalance, setMonthlyBalance] = useState<string | null>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    // Simulate form submission here (e.g., send data to backend)
    postData({
      name: name as string,
      yearOfBirth: yearOfBirth as string,
      address: address as `0x${string}`,
      country: country as string
    })

    setName(null)
    setYearOfBirth(null)
    setCountry(null)
    setAnnualIncome(null)
    setSalary(null)
    setBankAccounts(null)
    setCreditCards(null)
    setLoans(null)
    setDelay(null)
    setDelayedPayments(null)
    setCreditMix(null)
    setOutstandingDebt(null)
    setCreditHistory(null)
    setMonthlyBalance(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames('navbar-box-shadow py-4 bg-base-300 px-6', [
        className
      ])}
    >
      <h2 className="font-bold text-xl mb-4">KYC data:</h2>
      <label htmlFor="name">Name:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="name"
        name="name"
        placeholder="Enter your year of birth"
        value={name as string}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="name">Address:</label>
      {address ? (
        <span className="ml-4">{address}</span>
      ) : (
        <span className="ml-4 text-warning">Please connect your wallet.</span>
      )}
      <br />
      <br />

      <label htmlFor="year-of-birth">Year of Birth:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="year-of-birth"
        name="year-of-birth"
        placeholder="Enter your year of birth"
        value={yearOfBirth as string}
        onChange={e => setYearOfBirth(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="Country">Country:</label>
      <select
        value={country as string}
        onChange={e => setCountry(e.target.value)}
        className="bg-base-300 ml-2 cursor-pointer"
        id="country"
        name="country"
      >
        {countries.map((country, index) => (
          <option
            className="bg-base-300 cursor-pointer"
            key={index}
            value={country.code as string}
          >
            {country.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <hr className="w-full border-t border-base-100 mt-4 mb-4" />
      <h2 className="font-bold text-xl mb-4">Credit Score:</h2>
      <label htmlFor="annual-income">Annual income:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="annual-income"
        name="annual-income"
        placeholder="Enter you annual income"
        value={annualIncome as string}
        onChange={e => setAnnualIncome(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="salary">Monthly inhand salary:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="salary"
        name="salary"
        placeholder="Enter your year of birth"
        value={salary as string}
        onChange={e => setSalary(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="bank-accounts">Number of bank accounts:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="bank-accounts"
        name="bank-accounts"
        placeholder="Enter how many bank accounts you own"
        value={bankAccounts as string}
        onChange={e => setBankAccounts(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="credit-cards">Number of credit cards:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="credit-cards"
        name="credit-cards"
        placeholder="Enter how many credit cards you own"
        value={creditCards as string}
        onChange={e => setCreditCards(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="loans">Number of loans:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="loans"
        name="loans"
        placeholder="Enter how many loans you own"
        value={loans as string}
        onChange={e => setLoans(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="delay">Days of delay from due date:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="delay"
        name="delay"
        placeholder="Enter how much credit cards you own"
        value={delay as string}
        onChange={e => setDelayedPayments(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="delayed-payments">Number of delayed payments:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="delayed-payments"
        name="delayed-payments"
        placeholder="Enter how much credit cards you own"
        value={delayedPayments as string}
        onChange={e => setDelayedPayments(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="credit-mix">Credit mix:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="credit-mix"
        name="credit-mix"
        placeholder="Enter how much credit cards you own"
        value={creditMix as string}
        onChange={e => setCreditMix(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="outstanding-debt">Outstanding debt:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="outstanding-debt"
        name="outstanding-debt"
        placeholder="Enter your outstanding debt"
        value={outstandingDebt as string}
        onChange={e => setOutstandingDebt(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="credit-history">Years of credit history:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="credit-history"
        name="credit-history"
        placeholder="Enter your years of credit history"
        value={creditHistory as string}
        onChange={e => setCreditHistory(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="monthly-balance">Monthly balance:</label>
      <input
        required
        className="bg-base-300 ml-4"
        type="text"
        id="monthly-balance"
        name="monthly-balance"
        placeholder="Enter your monthly balance"
        value={monthlyBalance as string}
        onChange={e => setMonthlyBalance(e.target.value)}
      />
      <br />
      <br />
      {loading && !success && address ? (
        <button
          disabled
          className="bg-secondary text-primary border rounded-sm px-4"
        >
          Loading...{' '}
        </button>
      ) : !success && address ? (
        <button
          type="submit"
          className="bg-secondary text-primary border rounded-sm px-4"
        >
          Submit{' '}
        </button>
      ) : (
        <></>
      )}

      {success && (
        <p className="bg-success p-4 mt-4">
          You have been successfully KYCd! Go check your{' '}
          <Link href="/">
            <u>identity dashboard</u>
          </Link>
        </p>
      )}

      {error && (
        <p className="bg-error p-4 mt-4">
          It looks like you already passed KYC, you don't need to do it again
        </p>
      )}
    </form>
  )
}
