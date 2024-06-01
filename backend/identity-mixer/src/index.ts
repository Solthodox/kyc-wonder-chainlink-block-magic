import { Hono } from 'hono';
import { Env } from './types/sharedTypes';
import kycRouter from './routes/kyc';
import userRouter from './routes/user';
import mockProviderRouter from './routes/mockProviderData';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: Env }>();

// Apply CORS middleware globally
app.use(cors({
    origin: '*', // Allow all origins
    allowHeaders: ['x-api-key', 'Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'HEAD'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: false,
}));

// Handle preflight requests globally
app.options('*', (c) => {
    return c.json({ success: true }, 204); 
});

app.notFound((c) => c.json({ message: 'Route not Found', ok: false }, 404));

app.get('/', (c) => {
    return c.text(`Move along!`);
});

app.route('/kyc', kycRouter);
app.route('/user', userRouter);
app.route('/mock-data', mockProviderRouter);

export default app;


