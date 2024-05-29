'use client'

import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { type IdentitiesType } from '@/types'

/**
 * Custom hook to fetch KYC data based on the provided address.
 *
 * @template IdentitiesType - The type of identities expected from the API response.
 * @param url - The base URL for the API endpoint.
 * @param address - The wallet address to fetch KYC data for.
 * @returns An object containing the success state, error state, loading state, and identities data.
 */
function useGetKycData(url: string, address: string | null): IdentitiesType {
  // State to track success, error, loading, and identities data
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [identities, setIdentities] = useState<any[] | null>(null)

  useEffect(() => {
    // Function to fetch KYC data from the API
    const getData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`${url}/user/${address}`)
        console.log(response)
        setSuccess('200')
        setIdentities(response.data.data)
      } catch (error) {
        console.error(error)
        setError(error as AxiosError)
      } finally {
        setLoading(false)
      }
    }

    // Fetch data only if the address is not null
    if (address !== null) getData()
  }, [url, address])

  return { success, error, loading, identities }
}

export default useGetKycData
