import { BaseProvider } from '../base/baseProvider';
import ArgosApiError from './argosApiError';

interface ArgosApiResponse {
    Items?: {
        data: {
            date_of_birth: string;
            nationality: string;
        };
    }[];
}

export class ArgosProvider extends BaseProvider {
    constructor(protected apiKey: string) {
        super(apiKey);
    }

    async fetchKycData(submissionId: string): Promise<{ yearOfBirth: number; countryCode: string; }> {
        const headers = new Headers();
        headers.append('x-api-key', this.apiKey);
        const apiUrl = `https://rest-api.argoskyc.com/v3/submission?submission_id=${submissionId}`;

        const response = await fetch(apiUrl, { headers });
        if (!response.ok) {
            try {
                const errorData: ArgosApiError = await response.json();
                const errorMessage = errorData.errors?.[0]?.message || 'Argos KYC API request failed';
                throw new Error(errorMessage);
            } catch (jsonError) {
                throw new Error('Argos KYC API returned an invalid response');
            }
        }
        const responseData: ArgosApiResponse = await response.json();

        if (!responseData.Items || responseData.Items.length === 0) {
            throw new Error('KYC submission not found in Argos');
        }

        const kycData = responseData.Items[0].data;
        return {
            yearOfBirth: new Date(kycData.date_of_birth).getFullYear(),
            countryCode: kycData.nationality,
        };
    }
}
