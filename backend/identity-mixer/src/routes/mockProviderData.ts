import { Hono } from 'hono';
import { Database } from '../services/database';
import { Env } from '../interfaces/env';
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator';
import { insertMockKycSchema } from '../db/schema'

const mockProviderData = new Hono<{ Bindings: Env }>();
mockProviderData.use('/', cors());

const providerDataSchema = insertMockKycSchema.omit({ 
    id: true 
});

mockProviderData.post('/data/:address', zValidator("json", providerDataSchema), async (c) => { 
    // validate the data posted
    const providerData = c.req.valid("json"); 

    // after validate the data, insert it into the database
    const address = c.req.param('address');
    const envr: Env = c.env;
    const database = new Database(envr);
    const info = await database.createMockKYCData(
        providerData.name,
        providerData.yearOfBirth,
        providerData.country,
        providerData.provider_id,
        providerData.submission_id,
        providerData.creditScore
    );
    
    if (!info) {
        return c.json({ success: false, error: "KYC data not inserted" })
    }
    
    let client_id = await database.getClientIdByAddress(address);
    let clientInfo;
    
    if (client_id === 0) {
        clientInfo = await database.createClient(address);
        client_id = Number( await database.getClientIdByAddress(address));
        console.log(client_id);
    }
    
    if (!clientInfo) {
        return c.json({ success: false, error: "Client data not inserted" })
    }

    const relationInfo = await database.createRelation({
        address: address,
        provider_id: providerData.provider_id,
        client_id: client_id,
        submissionId: providerData.submission_id
    });
    
    if (relationInfo) {
        return c.json({ success: true, data: relationInfo });
    }

    return c.json({ success: true, data: info });
});

export default mockProviderData;
