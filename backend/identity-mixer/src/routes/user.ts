import { Hono } from 'hono';
import { Database } from '../services/database';
import { Env } from '../types/sharedTypes';
import { authMiddleware } from '../middleware/authMiddleware';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const user = new Hono<{ Bindings: Env }>();

const params = z.object({
    address: 
        z.string().regex(new RegExp(/^0x[0-9A-Fa-f]{40}$/), 
        { message: 'Address must be a valid Ethereum address' }
    )
});

const addParams = z.object({
    address: 
        z.string().regex(new RegExp(/^0x[0-9A-Fa-f]{40}$/), 
        { message: 'Address must be a valid Ethereum address' }
    ),
    newAddress: 
        z.string().regex(new RegExp(/^0x[0-9A-Fa-f]{40}$/), 
        { message: 'Address must be a valid Ethereum address' }
    )
});

user.get('/:address', 
    authMiddleware, 
    zValidator('param', params),
    async (c) => {
    const address = c.req.param('address').toLowerCase();
    const envr: Env = c.env;
    const database = new Database(envr);
    const clientId = await database.getClientByAddress(address);
    const addresses = await database.getWallets(clientId);
    
    return c.json({ success: true, data: addresses });
});

user.post('/add-address/:address/:newAddress', 
    authMiddleware, 
    zValidator('param', addParams),
    async (c) => {
    const address = c.req.param('address').toLowerCase();
    const newAddress = c.req.param('newAddress').toLowerCase();

    const envr: Env = c.env;
    const database = new Database(envr);
    const client = await database.getClientIdByAddress(address);
    if (client === 0) {
        return c.json({ success: false, error: 'Address not found' });
    }
    const result = await database.createRelationsByAddress(address, newAddress);
    
    return c.json({ success: true, result });
});

export default user;
