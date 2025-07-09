import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { texasMiddleware } from "./middleware/texasMiddleware";

const KravdetaljerRequestSchema = z.object({
    id: z.string(),
    type: z.enum(["SKATTEETATEN", "NAV"]),
});

export type KravdetaljerRequest = z.infer<typeof KravdetaljerRequestSchema>;

// TODO: Fjern standardverdier når APIet returnerer dataen
const KravdetaljerSchema = z.object({
    kravgrunnlag: z.object({
        datoNårKravVarBesluttetHosOppdragsgiver: z.string(),
        oppdragsgiversKravidentifikator: z.string().optional().default("OG-REF-9876"),
        oppdragsgiversSaksreferanse: z.string().optional().default("SAK-2025-001"),
    }),
    kravlinjer: z.array(
        z.object({
            kravlinjetype: z.string(),
            opprinneligBeløp: z.number(),
            gjenståendeBeløp: z.number(),
            kravlinjeBeskrivelse: z.object({
                spraakTekst: z.array(
                    z.object({
                        spraak: z.string().optional().default("nb"),
                        tekst: z.string().optional().default("Beskrivelse av kravlinje"),
                    })
                ).optional().default([{ spraak: "nb", tekst: "Beskrivelse av kravlinje" }]),
            }).optional().default({ spraakTekst: [{ spraak: "nb", tekst: "Beskrivelse av kravlinje" }] }),
        }),
    ),
    innbetalingPlassertMotKrav: z.array(
        z.object({
            innbetalingsIdentifikator: z.string().optional().default("INNBET-XYZ-1"),
            innbetalingstype: z.string().optional().default("Innbetaling"),
            innbetalingsdato: z.string().optional().default("2025-07-20"),
            innbetaltBeloep: z.number().optional().default(5000.00),
        })
    ).optional().default([{
        innbetalingsIdentifikator: "INNBET-XYZ-1",
        innbetalingstype: "Innbetaling",
        innbetalingsdato: "2025-07-20",
        innbetaltBeloep: 5000.00
    }]),
    tilleggsinformasjon: z.object({
        tilleggsinformasjonNav: z.object({
            vedtaksId: z.string().optional().default("NAV-VEDTAK-456"),
            ytelsestype: z.string().optional().default("Dagpenger"),
        }).optional().default({ vedtaksId: "NAV-VEDTAK-456", ytelsestype: "Dagpenger" }),
    }).optional().default({ tilleggsinformasjonNav: { vedtaksId: "NAV-VEDTAK-456", ytelsestype: "Dagpenger" } }),
    avvik: z.object({
        avvikstype: z.string().optional().default("tekniskfeil"),
        utdypendeAvviksbeskrivelse: z.string().optional().default("En teknisk feil har oppstått. Vennligst prøv igjen senere."),
    }).optional().default({ avvikstype: "tekniskfeil", utdypendeAvviksbeskrivelse: "En teknisk feil har oppstått. Vennligst prøv igjen senere." }),
    oppdragsgiver: z.object({
        organisasjonsnummer: z.string().optional().default("987654321"),
        organisasjonsnavn: z.string().optional().default("Skatteetaten"),
    }).optional().default({ organisasjonsnummer: "987654321", organisasjonsnavn: "Skatteetaten" }),
    skyldner: z.object({
        identifikator: z.string().optional().default("12345678910"),
        skyldnersNavn: z.string().optional().default("Ola Nordmann"),
    }).optional().default({ identifikator: "12345678910", skyldnersNavn: "Ola Nordmann" }),
});

export type Kravdetaljer = z.infer<typeof KravdetaljerSchema>;

const hentKravdetaljer = createServerFn()
    .validator(KravdetaljerRequestSchema)
    .middleware([texasMiddleware])
    .handler(async ({ data, context }) => {
        const kravdetaljerUrl = process.env.KRAVDETALJER_API_URL || "http://tilbakekreving/internal/kravdetaljer";
        const response = await fetch(
            kravdetaljerUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${context.oboToken}`,
                },
                body: JSON.stringify({
                    id: data.id,
                    type: data.type,
                }),
            },
        );

        if (!response.ok) {
            throw new Error("Feilet under henting av kravoversikt");
        } else {
            return KravdetaljerSchema.parse(await response.json());
        }
    });

export default hentKravdetaljer;