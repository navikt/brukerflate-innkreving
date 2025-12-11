import { Plugin } from "vite";
import { SignJWT } from "jose";
import { TextEncoder } from "util";
import { buffer } from "node:stream/consumers";

// Create a mock Texas token
const createMockTexasToken = async () => {
    const secret = new TextEncoder().encode("texas-dev-secret");
    return await new SignJWT({
        sub: "mock-texas-token",
        aud: "api://dev-gcp.utenlandsadresser.tilbakekreving/.default",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
};

export function texasTokenExchangePlugin(): Plugin {
    const tokenExchangePath = "/mock-token-exchange";

    return {
        name: "vite-plugin-texas-token-exchange",
        apply: "serve",
        configureServer(server) {
            server.httpServer?.once("listening", () => {
                const url =
                    server.resolvedUrls?.local?.[0] ??
                    server.resolvedUrls?.network?.[0] ??
                    (() => {
                        const addr = server.httpServer?.address();
                        if (addr && typeof addr === "object") {
                            const host =
                                server.config.server?.host || "localhost";
                            const protocol =
                                server.config.server?.https ? "https" : "http";
                            return `${protocol}://${host}:${addr.port}`;
                        }
                        return `http://localhost:${server.config.server?.port ?? 5173}`;
                    })();

                const base = url.replace(/\/$/, "");
                process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT ||= `${base}${tokenExchangePath}`;
                process.env.TILBAKEKREVING_TARGET ||=
                    "api://dev-gcp.utenlandsadresser.tilbakekreving/.default";

                console.log(
                    `Set NAIS_TOKEN_EXCHANGE_ENDPOINT to ${process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT}`,
                );
            });

            // Add middleware to the Vite dev server to handle token exchange
            server.middlewares.use(async (req, res, next) => {
                // Only handle POST requests to our token exchange path
                if (req.url === tokenExchangePath && req.method === "POST") {
                    try {
                        const buf = await buffer(req);
                        const requestData = JSON.parse(buf.toString());

                        // Validate the request
                        if (!requestData.user_token) {
                            res.statusCode = 400;
                            res.setHeader("Content-Type", "application/json");
                            res.end(
                                JSON.stringify({
                                    error: "Missing user_token",
                                }),
                            );
                            return;
                        }

                        const mockToken = await createMockTexasToken();

                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(
                            JSON.stringify({
                                access_token: mockToken,
                                expires_in: 3600,
                                token_type: "Bearer",
                            }),
                        );
                    } catch (error) {
                        console.error(
                            "Error in mock token exchange handler:",
                            error,
                        );
                        res.statusCode = 500;
                        res.setHeader("Content-Type", "application/json");
                        res.end(
                            JSON.stringify({
                                error: "Internal server error",
                            }),
                        );
                    }
                } else {
                    next();
                }
            });

            console.log(
                `Mock token exchange endpoint available at ${process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT}`,
            );
        },
    };
}
