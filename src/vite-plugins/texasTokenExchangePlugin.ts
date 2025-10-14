import { Plugin } from "vite";
import { SignJWT } from "jose";
import { TextEncoder } from "util";

// Create a mock Texas token
const createMockTexasToken = async () => {
    const secret = new TextEncoder().encode("texas-dev-secret");
    return await new SignJWT({
        // Add any claims needed for the mock Texas token
        sub: "mock-texas-token",
        aud: "api://dev-gcp.utenlandsadresser.tilbakekreving/.default",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
};

export function texasTokenExchangePlugin(): Plugin {
    // Use the Vite server path for token exchange
    const tokenExchangePath = "/mock-token-exchange";

    return {
        name: "vite-plugin-texas-token-exchange",
        configResolved() {
            // Set the NAIS_TOKEN_EXCHANGE_ENDPOINT environment variable to use the Vite server
            process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT = `http://localhost:5173${tokenExchangePath}`;
            process.env.TILBAKEKREVING_TARGET =
                "api://dev-gcp.utenlandsadresser.tilbakekreving/.default";
            console.log(
                `Set NAIS_TOKEN_EXCHANGE_ENDPOINT to ${process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT}`,
            );
        },
        configureServer(server) {
            // Add middleware to the Vite dev server to handle token exchange
            server.middlewares.use(async (req, res, next) => {
                // Only handle POST requests to our token exchange path
                if (req.url === tokenExchangePath && req.method === "POST") {
                    let body = "";
                    req.on("data", (chunk) => {
                        body += chunk.toString();
                    });

                    req.on("end", async () => {
                        try {
                            // Parse the request body
                            const requestData = JSON.parse(body);

                            // Validate the request
                            if (!requestData.user_token) {
                                res.statusCode = 400;
                                res.setHeader(
                                    "Content-Type",
                                    "application/json",
                                );
                                res.end(
                                    JSON.stringify({
                                        error: "Missing user_token",
                                    }),
                                );
                                return;
                            }

                            // Generate a mock Texas token
                            const mockToken = await createMockTexasToken();

                            // Return a valid TexasResponse
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
                    });
                } else {
                    // Pass through for all other requests
                    next();
                }
            });

            console.log(
                `Mock token exchange endpoint available at ${process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT}`,
            );
        },
    };
}
