import { ProviderInterface } from '../../interfaces/providers';

export class BaseProvider implements ProviderInterface {
  constructor(protected apiKey: string) {}
  
  fetchKycData(submissionId: string): Promise<{ yearOfBirth: number; countryCode: string; }> {
        throw new Error('Method not implemented.');
  }
}
