import { Plugin } from "vite";

// Mock data for kravoversikt
const mockKravoversiktData = {
    krav: [
        {
            kravidentifikator: {
                type: "SKATTEETATEN",
                id: "87b5a5c6-17ea-413a-ad80-b6c3406188fa",
            },
            kravtype: "Tilbakebetaling av skatt",
        },
        {
            kravidentifikator: {
                type: "NAV",
                id: "12345678-1234-1234-1234-123456789012",
            },
            kravtype: "Tilbakebetaling av dagpenger",
        },
    ],
};

// Mock data for kravdetaljer
const mockKravdetaljerData = {
    kravgrunnlag: {
        datoNårKravVarBesluttetHosOppdragsgiver: "2023-01-15",
    },
    kravlinjer: [
        {
            kravlinjetype: "HOVEDKRAV",
            opprinneligBeløp: 15000,
            gjenståendeBeløp: 10000,
        },
        {
            kravlinjetype: "RENTER",
            opprinneligBeløp: 500,
            gjenståendeBeløp: 500,
        },
    ],
};

export function mockKravPlugin(): Plugin {
    // Define the paths for our mock endpoints
    const kravoversiktPath = "/internal/kravoversikt";
    const kravdetaljerPath = "/internal/kravdetaljer";

    return {
        name: "vite-plugin-mock-krav",
        configResolved() {
            // Set the environment variables to use the Vite server
            process.env.KRAVOVERSIKT_API_URL = `http://localhost:5173${kravoversiktPath}`;
            process.env.KRAVDETALJER_API_URL = `http://localhost:5173${kravdetaljerPath}`;

            console.log(`Set KRAVOVERSIKT_API_URL to ${process.env.KRAVOVERSIKT_API_URL}`);
            console.log(`Set KRAVDETALJER_API_URL to ${process.env.KRAVDETALJER_API_URL}`);
        },
        configureServer(server) {
            // Add middleware to intercept requests to krav endpoints
            server.middlewares.use(async (req, res, next) => {
                // Parse the URL to check if it's one of our mock endpoints
                const url = req.url || "";

                // Handle kravoversikt endpoint
                if (url.includes(kravoversiktPath) && req.method === "POST") {
                    let body = "";
                    req.on("data", (chunk) => {
                        body += chunk.toString();
                    });

                    req.on("end", () => {
                        try {
                            // Parse the request body (optional validation)
                            const requestData = JSON.parse(body);
                            console.log("Mock kravoversikt request:", requestData);

                            // Return mock data
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify(mockKravoversiktData));
                        } catch (error) {
                            console.error("Error in mock kravoversikt handler:", error);
                            res.statusCode = 500;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify({ error: "Internal server error" }));
                        }
                    });
                    return;
                }

                // Handle kravdetaljer endpoint
                if (url.includes(kravdetaljerPath) && req.method === "POST") {
                    let body = "";
                    req.on("data", (chunk) => {
                        body += chunk.toString();
                    });

                    req.on("end", () => {
                        try {
                            // Parse the request body (optional validation)
                            const requestData = JSON.parse(body);
                            console.log("Mock kravdetaljer request:", requestData);

                            // Return mock data
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify(mockKravdetaljerData));
                        } catch (error) {
                            console.error("Error in mock kravdetaljer handler:", error);
                            res.statusCode = 500;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify({ error: "Internal server error" }));
                        }
                    });
                    return;
                }

                // Pass through for all other requests
                next();
            });

            console.log("Mock krav endpoints available for kravoversikt and kravdetaljer");
        },
    };
}
