export interface ProviderInterface {
  fetchKycData(submissionId: string): Promise<{
    yearOfBirth: number;
    countryCode: string;
  }>;
}
