import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware(async (c, next) => {
    try {
        const apiKey = c.req.header("x-api-key");
        if (apiKey !== c.env.AUTH_API_KEY && apiKey !== c.env.FRONT_API_KEY) {
            return c.json("Unauthorized", 401);
        }
        await next();
    } catch (error) {
        console.error(error);
        return c.json("Unauthorized.", 401);
    }
});



