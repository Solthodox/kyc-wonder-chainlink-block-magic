import { AxiosError } from "axios"

export type LatestKycData = [BigInt, boolean, BigInt, BigInt, BigInt, , BigInt, BigInt]
export interface IdentitiesType {
    success: string | null
    error: AxiosError | null
    loading: boolean
    identities: any[] | null
  }

export interface KycData {
    name: string
    yearOfBirth: string
    address: string
    country: string
  }