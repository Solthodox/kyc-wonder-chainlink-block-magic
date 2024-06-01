import { Hono } from 'hono';
import { Web3 } from '../services/ethereum';
import { Database } from '../services';
import { Env } from '../types/sharedTypes';
import { authMiddleware } from '../middleware/authMiddleware';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const kyc = new Hono<{ Bindings: Env }>();

const params = z.object({
    address: 
        z.string().regex(new RegExp(/^0x[0-9A-Fa-f]{40}$/), 
        { message: 'Address must be a valid Ethereum address' }
    ),
    providerId: 
        z.string().regex(new RegExp(/^[0-9]+$/), 
        { message: 'Provider ID must be a number' }
    ),
});

kyc.get('/:address/:providerId{[0-9]+}', 
    authMiddleware, 
    zValidator('param', params),
    async (c) => {
    const address = c.req.param('address').toLowerCase();
    const providerId = c.req.param('providerId');

    const envr: Env = c.env;
    const database = new Database(envr);

    try {
        const kycData = await database.getRelationByAddress(address);
        const web3 = new Web3(envr);
        const isAdult = kycData.isAdult === 1 ? true : false;
        const parsedData = await web3.parseData(
            kycData.yearOfBirth,
            isAdult,
            kycData.countryCode,
            kycData.creditScore
        );
        return c.json({ parsedData });
    }
    catch (error) {
        return c.json({ success: false, error: "Failed to get KYC" })
    }
});

export default kyc;
