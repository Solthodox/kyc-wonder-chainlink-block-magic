import { Hono } from 'hono';
import { Database } from '../services/database';
import { Env } from '../types/sharedTypes';
import { zValidator } from '@hono/zod-validator';
import { insertMockKycSchema } from '../db/index'
import { getNumericCodeFromAlpha3 } from '../services/iso3166';
import { authMiddleware } from '../middleware/authMiddleware';
import { z } from 'zod';

const mockProviderData = new Hono<{ Bindings: Env }>();

const providerDataSchema = insertMockKycSchema.omit({
    id: true,
    address: true
});

const params = z.object({
    address: 
        z.string().regex(new RegExp(/^0x[0-9A-Fa-f]{40}$/), 
        { message: 'Address must be a valid Ethereum address' }
    )
});

mockProviderData.post(
    '/data/:address', 
    zValidator('json', providerDataSchema), 
    zValidator('param', params),
    authMiddleware, 
    async (c) => {
    try {
        // validate the data posted
        const providerData = c.req.valid('json');

        // after validate the data, insert it into the database
        const address = c.req.param('address').toLowerCase();
        const envr: Env = c.env;
        const database = new Database(envr);
        const info = await database.createMockKYCData(
            address,
            providerData,
        );
        
        if (!info) {
            return c.json({ success: false, error: 'KYC data not inserted' })
        }

        let client_id = await database.getClientIdByAddress(address);
        let clientInfo;

        if (client_id === 0) {
            clientInfo = await database.createClient(address);
            client_id = Number(await database.getClientIdByAddress(address));
        }

        if (!clientInfo) {
            return c.json({ success: false, error: 'Client data not inserted' })
        }

        const country = getNumericCodeFromAlpha3(providerData.country) as number;
        const adult = providerData.yearOfBirth <= new Date().getFullYear() - 18 ? 1 : 0;

        const relationInfo = await database.createRelation({
            address: address,
            provider_id: providerData.provider_id,
            client_id: client_id,
            submissionId: providerData.submission_id,
            isAdult: adult,
            countryCode: country,
            creditScore: 0,
            yearOfBirth: providerData.yearOfBirth
        });

        if (relationInfo) {
            return c.json({ success: true, data: relationInfo });
        }

        return c.json({ success: true, data: info });
    } catch (error) {
        return c.json({ success: false, error: 'Failed to insert KYC data' })
    }
});

export default mockProviderData;
