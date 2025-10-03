import { Plugin } from "vite";

// Mock data for kravoversikt
const mockKravoversiktData = {
    oppdragsgiver: {
        organisasjonsnummer: "889640782",
        organisasjonsnavn: "NAV Arbeid og ytelser",
    },
    skyldner: {
        identifikator: "12345678901",
        skyldnersNavn: "Ola Nordmann",
    },
    gjenståendeBeløpForSkyldner: 25500.0,
    krav: [
        {
            skeKravidentifikator: "87b5a5c6-17ea-413a-ad80-b6c3406188fa",
            navKravidentifikator: "NAV-SKE-2023-001234",
            navReferanse: "Vedtak 15.01.2023",
            kravtype: "Tilbakebetaling av skatt",
            kravbeskrivelse: {
                nb: "Tilbakebetaling av for mye utbetalt skatt for 2023",
                en: "Repayment of overpaid tax for 2023",
            },
            gjenståendeBeløp: 15000.0,
        },
        {
            skeKravidentifikator: "98c6b6d7-28fb-524b-be91-c7d4517299fb",
            navKravidentifikator: "12345678-1234-1234-1234-123456789012",
            navReferanse: null,
            kravtype: "Tilbakebetaling av dagpenger",
            kravbeskrivelse: {
                nb: "Tilbakebetaling av urettmessig mottatte dagpenger",
                en: "Repayment of wrongfully received unemployment benefits",
            },
            gjenståendeBeløp: 10500.0,
        },
    ],
};

// Mock data for kravdetaljer
const mockKravdetaljerData = {
    krav: {
        forfallsdato: "2023-12-31",
        foreldelsesdato: "2028-12-31",
        fastsettelsesdato: "2023-01-15",
        kravtype: "Tilbakebetaling av skatt",
        opprinneligBeløp: 15000.0,
        gjenståendeBeløp: 10000.0,
        skatteetatensKravidentifikator: "87b5a5c6-17ea-413a-ad80-b6c3406188fa",
        kravlinjer: [
            {
                kravlinjetype: "HOVEDKRAV",
                opprinneligBeløp: 14000.0,
                gjenståendeBeløp: 9500.0,
                kravlinjeBeskrivelse: {
                    nb: "Tilbakebetaling av for mye utbetalt skatt",
                    en: "Repayment of overpaid tax",
                },
            },
            {
                kravlinjetype: "RENTER",
                opprinneligBeløp: 1000.0,
                gjenståendeBeløp: 500.0,
                kravlinjeBeskrivelse: {
                    nb: "Renter på hovedkrav",
                    en: "Interest on main claim",
                },
            },
        ],
        kravgrunnlag: {
            oppdragsgiversKravidentifikator: "SKE-2023-001234",
            oppdragsgiversReferanse: "Vedtak 15.01.2023",
        },
        innbetalingerPlassertMotKrav: [
            {
                innbetalingsIdentifikator: "INNBET-2023-001",
                innbetalingstype: "Bankoverføring",
                innbetalingsdato: "2023-07-20",
                innbetaltBeløp: 5000.0,
            },
        ],
        tilleggsinformasjon: {
            type: "Nav",
            ytelserForAvregning: {
                valuta: "NOK",
                beløp: 2000,
            },
            tilbakekrevingsperiode: {
                fom: "2023-01-01",
                tom: "2023-12-31",
            },
        },
    },
    oppdragsgiver: {
        organisasjonsnummer: "889640782",
        organisasjonsnavn: "NAV Arbeid og ytelser",
    },
    skyldner: {
        identifikator: "12345678901",
        skyldnersNavn: "Ola Nordmann",
    },
    avvik: null,
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
