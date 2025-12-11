import { Plugin } from "vite";
import { buffer } from "node:stream/consumers";
import { resolveDevServerBaseUrl } from "./devServerUrl";
import type { Kravoversikt } from "../server/hentKravoversikt";
import type { Kravdetaljer } from "../server/hentKravdetaljer";

// Mock data for kravoversikt
const mockKravoversiktData: Kravoversikt = {
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
            kravbeskrivelse: [
                {
                    språk: "nb",
                    tekst: "Tilbakebetaling av for mye utbetalt skatt for 2023",
                },
            ],
            gjenståendeBeløp: 15000.0,
        },
        {
            skeKravidentifikator: "98c6b6d7-28fb-524b-be91-c7d4517299fb",
            navKravidentifikator: "12345678-1234-1234-1234-123456789012",
            navReferanse: null,
            kravtype: "Tilbakebetaling av dagpenger",
            kravbeskrivelse: [
                {
                    språk: "nb",
                    tekst: "Tilbakebetaling av urettmessig mottatte dagpenger",
                },
                {
                    språk: "en",
                    tekst: "Repayment of wrongfully received unemployment benefits",
                },
            ],
            gjenståendeBeløp: 10500.0,
        },
    ],
};

// Mock data for kravdetaljer
const mockKravdetaljerData: Kravdetaljer = {
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
            oppdragsgiversKravidentifikator: "NAV-SKE-2023-001234",
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
            periode: null,
            stoppdatoForLøpendeMulkt: null,
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

// Mock data for kravdetaljer with Brønnøysund type
const mockKravdetaljerDataBronnoy: Kravdetaljer = {
    krav: {
        forfallsdato: "2024-06-30",
        foreldelsesdato: "2029-06-30",
        fastsettelsesdato: "2024-01-10",
        kravtype: "Tvangsmulkt",
        opprinneligBeløp: 50000.0,
        gjenståendeBeløp: 45000.0,
        skatteetatensKravidentifikator: "98c6b6d7-28fb-524b-be91-c7d4517299fb",
        kravlinjer: [
            {
                kravlinjetype: "TVANGSMULKT",
                opprinneligBeløp: 50000.0,
                gjenståendeBeløp: 45000.0,
                kravlinjeBeskrivelse: {
                    nb: "Tvangsmulkt for manglende etterlevelse",
                    en: "Penalty for non-compliance",
                },
            },
        ],
        kravgrunnlag: {
            oppdragsgiversKravidentifikator: "BRREG-2024-005678",
            oppdragsgiversReferanse: "Vedtak 10.01.2024",
        },
        innbetalingerPlassertMotKrav: [
            {
                innbetalingsIdentifikator: "INNBET-2024-002",
                innbetalingstype: "Bankoverføring",
                innbetalingsdato: "2024-03-15",
                innbetaltBeløp: 5000.0,
            },
        ],
        tilleggsinformasjon: {
            type: "BrønnøysundRegistrene",
            periode: {
                fom: "2024-01-01",
                tom: "2024-12-31",
            },
            stoppdatoForLøpendeMulkt: "2024-06-01",
            ytelserForAvregning: null,
            tilbakekrevingsperiode: null,
        },
    },
    oppdragsgiver: {
        organisasjonsnummer: "974760673",
        organisasjonsnavn: "Brønnøysundregistrene",
    },
    skyldner: {
        identifikator: "987654321",
        skyldnersNavn: "Kari Nordmann",
    },
    avvik: null,
};

// Mock data with avvik
const mockKravdetaljerDataWithAvvik: Kravdetaljer = {
    krav: {
        forfallsdato: "2023-12-31",
        foreldelsesdato: "2028-12-31",
        fastsettelsesdato: "2023-01-15",
        kravtype: "Tilbakebetaling av skatt",
        opprinneligBeløp: 15000.0,
        gjenståendeBeløp: 10000.0,
        skatteetatensKravidentifikator: "error-case-123",
        kravlinjer: [],
        kravgrunnlag: {
            oppdragsgiversKravidentifikator: "ERROR-2023-001234",
            oppdragsgiversReferanse: "Vedtak 15.01.2023",
        },
        innbetalingerPlassertMotKrav: [],
        tilleggsinformasjon: null,
    },
    oppdragsgiver: {
        organisasjonsnummer: "889640782",
        organisasjonsnavn: "NAV Arbeid og ytelser",
    },
    skyldner: {
        identifikator: "12345678901",
        skyldnersNavn: null,
    },
    avvik: {
        avvikstype: "tekniskfeil",
        utdypendeAvviksbeskrivelse:
            "Det oppstod en teknisk feil ved henting av kravdata. Vennligst prøv igjen senere.",
    },
};

export function mockKravPlugin(): Plugin {
    // Define the paths for our mock endpoints
    const kravoversiktPath = "/internal/kravoversikt";
    const kravdetaljerPath = "/internal/kravdetaljer";

    return {
        name: "vite-plugin-mock-krav",
        apply: "serve",
        configureServer(server) {
            server.httpServer?.once("listening", () => {
                const base = resolveDevServerBaseUrl(server);
                process.env.KRAVOVERSIKT_API_URL ||= `${base}${kravoversiktPath}`;
                process.env.KRAVDETALJER_API_URL ||= `${base}${kravdetaljerPath}`;

                console.log(
                    `Set KRAVOVERSIKT_API_URL to ${process.env.KRAVOVERSIKT_API_URL}`,
                );
                console.log(
                    `Set KRAVDETALJER_API_URL to ${process.env.KRAVDETALJER_API_URL}`,
                );
            });

            // Add middleware to intercept requests to krav endpoints
            server.middlewares.use(async (req, res, next) => {
                // Parse the URL to check if it's one of our mock endpoints
                const url = req.url || "";

                // Handle kravoversikt endpoint
                if (url === kravoversiktPath && req.method === "POST") {
                    try {
                        const buf = await buffer(req);
                        const requestData = JSON.parse(buf.toString() || "{}");
                        console.log("Mock kravoversikt request:", requestData);

                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify(mockKravoversiktData));
                    } catch (error) {
                        console.error(
                            "Error in mock kravoversikt handler:",
                            error,
                        );
                        res.statusCode = 500;
                        res.setHeader("Content-Type", "application/json");
                        res.end(
                            JSON.stringify({ error: "Internal server error" }),
                        );
                    }
                    return;
                }

                // Handle kravdetaljer endpoint
                if (url === kravdetaljerPath && req.method === "POST") {
                    try {
                        const buf = await buffer(req);
                        const requestData = JSON.parse(buf.toString() || "{}");
                        console.log("Mock kravdetaljer request:", requestData);

                        // Return different mock data based on the krav ID
                        let responseData = mockKravdetaljerData;
                        if (
                            requestData.id ===
                            "98c6b6d7-28fb-524b-be91-c7d4517299fb"
                        ) {
                            responseData = mockKravdetaljerDataBronnoy;
                        } else if (requestData.id === "error-case") {
                            responseData = mockKravdetaljerDataWithAvvik;
                        }

                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify(responseData));
                    } catch (error) {
                        console.error(
                            "Error in mock kravdetaljer handler:",
                            error,
                        );
                        res.statusCode = 500;
                        res.setHeader("Content-Type", "application/json");
                        res.end(
                            JSON.stringify({ error: "Internal server error" }),
                        );
                    }
                    return;
                }

                // Pass through for all other requests
                next();
            });
        },
    };
}
