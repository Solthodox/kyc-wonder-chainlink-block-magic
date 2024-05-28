const generateRandomApiKey = (length = 32): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let apiKey = '';
    for (let i = 0; i < length; i++) {
        apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
};

export const generateApiKey = async (request, env): Promise<Response> => {
    try {
        const newApiKey = generateRandomApiKey();

        const data = new TextEncoder().encode(newApiKey);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedApiKey = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        await env.API_KEYS.put(newApiKey, hashedApiKey);

        return new Response(JSON.stringify({ apiKey: newApiKey }), { status: 201 });
    } catch (error) {
        return new Response("Error generating API key", { status: 500 });
    }
};

export const verifyApiKey = async (request, env): Promise<boolean> => {
    const authorizationHeader = request.headers.get("Authorization");
    if (!authorizationHeader) {
        return false;
    }

    const apiKey = request.headers.get("x-api-key"); // Extract the key

    const storedHash = await env.API_KEYS.get(apiKey);
    if (!storedHash) {
        return false;
    }

    const data = new TextEncoder().encode(apiKey);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedApiKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return storedHash === hashedApiKey;
};

export function requireApiKey(handler) {
    return async (request, env) => {
        const isApiKeyValid = await verifyApiKey(request, env);
        if (!isApiKeyValid) {
            return new Response("Unauthorized", { status: 401 });
        }
        return handler(request, env);
    };
}
