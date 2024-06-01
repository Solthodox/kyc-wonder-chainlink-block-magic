import { AxiosError } from "axios";

export type LatestKycData = [
  BigInt,
  boolean,
  BigInt,
  BigInt,
  BigInt,
  BigInt,
  BigInt,
];

export interface IdentitiesType {
  success: string | null;
  error: AxiosError | null;
  loading: boolean;
  identities: any[] | null;
}
export interface KycData {
  name: string;
  yearOfBirth: number;
  address: string;
  country: string;
  annualIncome: number;
  salary: number;
  bankAccounts: number;
  creditCards: number;
  loans: number;
  delay: number;
  delayedPayments: number;
  creditMix: number;
  outstandingDebt: number;
  creditHistory: number;
  monthlyBalance: number;
}
export interface AddressData {
  mainAddress: string;
  newAddress: string;
}
