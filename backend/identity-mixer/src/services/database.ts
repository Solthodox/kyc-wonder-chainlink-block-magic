import {
    Relation,
    Info,
    ProviderData,
    Client,
} from '../types/sharedTypes';
import { Env } from '../types/sharedTypes';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import {
    relations,
    providers,
    clients,
    mockKyc,
    insertClientsSchema,
    insertMockKycSchema,
} from '../db/index';

export class Database {
    private db: any;

    constructor(env: Env) {
        try {
            this.db = drizzle(env.DB);
        } catch (error) {
            throw error;
        }
    }

    //--- Client ---//
    async createClient(creator: string): Promise<Info> {
        const validatedClient = insertClientsSchema.parse({ creator });

        const info = await this.db.insert(clients).values(validatedClient).run();
        return info;
    }

    async getClientById(id: number): Promise<Client> {
        const result = await this.db.select().from(clients).where(eq(clients.id, id)).run();
        return result.results;
    }

    async getClientIdByAddress(address: string): Promise<number> {
        const result = await this.db.select().from(clients).where(eq(clients.creator, address.toLowerCase())).run();
        console.log(result);
        if (result.results && result.results.length > 0) {
            console.log(result.results[0].id);
            return result.results[0].id;
        }
        return 0; 
    }

    async getClients(): Promise<Client[]> {
        const results = await this.db.select().from(clients).run();
        return results;
    }

    //--- Provider ---//
    async createProvider(name: string): Promise<Info> {
        const info = await this.db.insert(providers).values({ name }).run();
        return info;
    }

    async getProviderById(id: number): Promise<any> {
        const result = await this.db.select().from(providers).where(eq(providers.id, id)).run();
        return result.results.id;
    }

    async getProviders(): Promise<any> {
        const results = await this.db.select().from(providers).run();
        return results.results;
    }

    async getSubmissionIdByAddressAndProvider(address: string, providerId: number): Promise<string> {
        const results = await this.db.select().from(relations).where(eq(relations.provider_id, providerId), eq(relations.address, address.toLowerCase())).run();
        return results.results[0].submission_id;
    }

    //--- Relations ---//
    async createRelation(relation: Omit<Relation, 'id'>): Promise<Info> {
        const { address, provider_id, client_id, submissionId, yearOfBirth, countryCode, isAdult, creditScore } = relation;
        const info = await this.db.insert(relations).values({ address, provider_id, client_id, submission_id: submissionId, yearOfBirth, countryCode, isAdult, creditScore }).run();
        return info;
    }

    async getRelations(): Promise<Relation[]> {
        const result = await this.db.select().from(relations).orderBy(relations.id).run();
        return result.results;
    }

    async createRelationsByAddress(oldAddress: string, newAddress: string): Promise<Info> {
        // Check if the new address already exists
        const verifyNewAddress = await this.db.select().from(relations).where(eq(relations.address, newAddress.toLowerCase())).run();
        // If the address already exists, return an error
        if (verifyNewAddress.results.length > 0) {
            return { success: false, meta: { duration: 0 } };
        }
        // Check if the address exists
        const result = await this.db.select().from(relations).where(eq(relations.address, oldAddress.toLowerCase())).run();

        // If the address does not exist, return an error
        if (result.results.length === 0) {
            return { success: false, meta: { duration: 0 } };
        }

        // Create a new relation with the new address
        const info = await this.db.insert(relations).values({
            address: newAddress,
            provider_id: result.results[0].provider_id,
            client_id: result.results[0].client_id,
            submission_id: result.results[0].submission_id,
            yearOfBirth: result.results[0].yearOfBirth,
            countryCode: result.results[0].countryCode,
            isAdult: result.results[0].isAdult,
            creditScore: result.results[0].creditScore,
        }).run();

        return info;
    }

    //--- Wallets ---//
    async getClientByAddress(address: string): Promise<number> {
        const result = await this.db.select().from(clients).where(eq(clients.creator, address.toLowerCase())).run();
        return result.results[0].id;
    }

    async getWallets(clientId: number): Promise<Relation[]> {
        const result = await this.db.select().from(relations).where(eq(relations.client_id, clientId)).run();
        return result.results;
    }

    async getRelationByAddress(address: string): Promise<Relation> {
        const result = await this.db.select().from(relations).where(eq(relations.address, address)).run();
        return result.results[0];
    }

    // --- MOCK_KYC_PROVIDER_DATA_HACKATHON --- //
    async createMockKYCData(
        address: string,
        providerData: ProviderData 
    ): Promise<Info> {
        const validatedMockKyc = insertMockKycSchema.parse(
            {
                address: address.toLowerCase(),
                name: providerData.name,
                yearOfBirth: providerData.yearOfBirth,
                country: providerData.country,
                provider_id: providerData.provider_id,
                submission_id: providerData.submission_id,
                annual_Income: providerData.annual_Income,
                monthly_Inhand_Salary: providerData.monthly_Inhand_Salary,
                num_Bank_Accounts: providerData.num_Bank_Accounts,
                num_Credit_Cards: providerData.num_Credit_Cards,
                interest_Rate: providerData.interest_Rate,
                num_Loans: providerData.num_Loans,
                delay_From_Due_Date: providerData.delay_From_Due_Date,
                num_Delayed_Payments: providerData.num_Delayed_Payments,
                credit_Mix: providerData.credit_Mix,
                outstanding_Debt: providerData.outstanding_Debt,
                credit_History_Year: providerData.credit_History_Year,
                monthly_Balance: providerData.monthly_Balance

            }
        );
        const info = await this.db.insert(mockKyc).values(validatedMockKyc).run();
        return info;
    }
}
