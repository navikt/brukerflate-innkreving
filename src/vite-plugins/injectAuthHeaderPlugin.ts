import { Plugin } from "vite";
import { SignJWT } from "jose";
import { TextEncoder } from "util";

// Mock data for development JWT token
const mockBrukerData = {
    NAVident: "Z999999",
    preferred_username: "dev.user@nav.no",
    name: "Development User",
    groups: ["group1", "group2"],
};

// Create a signed JWT token
const createDevJwt = async () => {
    const secret = new TextEncoder().encode("dev-secret");
    return await new SignJWT(mockBrukerData)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
};

export function injectAuthHeaderPlugin(): Plugin {
    const jwt: Promise<string> = createDevJwt();

    return {
        name: "vite-plugin-dev-auth",
        apply: "serve",
        configureServer(server) {
            server.middlewares.use(async (req, _res, next) => {
                // Only add the header if it doesn't already exist
                if (!req.headers.authorization) {
                    req.headers.authorization = `Bearer ${await jwt}`;
                }
                next();
            });
        },
    };
}
