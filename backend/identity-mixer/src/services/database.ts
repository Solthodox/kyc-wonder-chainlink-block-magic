import {
    Relation,
} from '../interfaces/database';
import { Env } from '../interfaces/env';
import { drizzle } from 'drizzle-orm/d1';
import {
    relations,
    providers,
    clients,
    mockKyc,
    insertClientsSchema,
    selectClientsSchema,
    insertProvidersSchema,
    selectProvidersSchema,
    insertRelationsSchema,
    selectRelationsSchema,
    insertMockKycSchema,
    selectMockKycSchema
} from '../db/schema';
import { eq } from 'drizzle-orm';

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
    async createClient(creator: string): Promise<any> {
        const validatedClient = insertClientsSchema.parse({ creator });

        const info = await this.db.insert(clients).values(validatedClient).run();
        return info;
    }

    async getClientById(id: number): Promise<any> {
        const result = await this.db.select().from(clients).where(eq(clients.id, id)).run();
        return result.results;
    }

    async getClientIdByAddress(address: string): Promise<number> {
        const result = await this.db.select().from(clients).where(eq(clients.creator, address.toLowerCase())).run();
        if (result.results && result.results.length > 0) {
            console.log(result.results[0].id);
            return result.results[0].id;
        }
        return 0; 
    }

    async getClients(): Promise<any> {
        const results = await this.db.select().from(clients).run();
        return results;
    }

    //--- Provider ---//
    async createProvider(name: string): Promise<any> {
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

    async getSubmissionIdByAddressAndProvider(address: string, providerId: number): Promise<any> {
        const results = await this.db.select().from(relations).where(eq(relations.provider_id, providerId), eq(relations.address, address.toLowerCase())).run();
        return results.results[0].submission_id;
    }

    //--- Relations ---//
    async createRelation(relation: Omit<Relation, 'id'>): Promise<any> {
        const { address, provider_id, client_id, submissionId } = relation;
        let mockSubmissionId = submissionId;
        if (submissionId === undefined || submissionId === null) {
            mockSubmissionId = client_id.toString();
        }
        const info = await this.db.insert(relations).values({ address, provider_id, client_id, submission_id: mockSubmissionId }).run();
        return info;
    }

    async getRelations(): Promise<any> {
        const result = await this.db.select().from(relations).orderBy(relations.id).run();
        return result.results;
    }

    async createRelationsByAddress(oldAddress: string, newAddress: string): Promise<any> {
        // Check if the new address already exists
        const verifyNewAddress = await this.db.select().from(relations).where(eq(relations.address, newAddress.toLowerCase())).run();

        // If the address already exists, return an error
        if (verifyNewAddress.results.length === 0) {
            return { success: false, message: 'Address already exists' };
        }

        // Check if the address exists
        const result = await this.db.select().from(relations).where(eq(relations.address, oldAddress.toLowerCase())).run();

        // If the address does not exist, return an error
        if (result.results.length === 0) {
            return { success: false, message: 'Address not found' };
        }

        // Create a new relation with the new address
        const info = await this.db.insert(relations).values({
            address: newAddress,
            provider_id: result.results[0].provider_id,
            client_id: result.results[0].client_id,
            submission_id: result.results[0].submission_id,
        }).run();

        return info;
    }

    //--- Wallets ---//
    async getClientByAddress(address: string): Promise<number> {
        const result = await this.db.select().from(clients).where(eq(clients.creator, address.toLowerCase())).run();
        return result.results[0].id;
    }

    async getWallets(clientId: number): Promise<any> {
        const result = await this.db.select().from(relations).where(eq(relations.client_id, clientId)).run();
        return result.results;
    }

    // --- MOCK_KYC_PROVIDER_DATA_HACKATHON --- //
    async createMockKYCData(
        name: string,
        yearOfBirth: number,
        country: string,
        provider_id: number,
        submission_id: string,
        creditScore: number
    ): Promise<any> {
        const validatedMockKyc = insertMockKycSchema.parse({ name, yearOfBirth, country, provider_id, submission_id, creditScore });
        const info = await this.db.insert(mockKyc).values(validatedMockKyc).run();
        return info;
    }
}
