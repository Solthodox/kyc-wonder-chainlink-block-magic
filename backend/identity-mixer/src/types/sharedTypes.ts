export type Env = { 
    ARGOS_API_KEY: string;
    RPC_URL: string;
    AUTH_API_KEY: string;
    FRONT_API_KEY: string;
    DB: D1Database;
}

export type Client = {
    id: number;
    creator: string;
}

export type Provider = {
    id: number;
    name: string;
}

export type Relation = {
    id: number;
    address: string;
    provider_id: number;
    client_id: number;
    submissionId: string;
    yearOfBirth: number;
    countryCode: number;
    isAdult: number;
    creditScore: number;
}

export type Info = {
    success: boolean;
    meta: {
        duration: number;
    }
}

export type Address = {
    address: string;
}

export type ProviderData = {
    name: string,
    yearOfBirth: number,
    country: string,
    provider_id: number,
    submission_id: string,
    annual_Income: number,
    monthly_Inhand_Salary: number,
    num_Bank_Accounts: number,
    num_Credit_Cards: number,
    interest_Rate: number,
    num_Loans: number,
    delay_From_Due_Date: number,
    num_Delayed_Payments: number,
    credit_Mix: number,
    outstanding_Debt: number,
    credit_History_Year: number,
    monthly_Balance: number
}

export type KycData = {
    name: string;
    yearOfBirth: number;
    country: string;
    providerId: number;
    submissionId: string;
    creditScore: number;
}

export type ProviderInterface = {
  fetchKycData(submissionId: string): Promise<{
    yearOfBirth: number;
    countryCode: string;
  }>;
}
