import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { SøkSchema } from "../types/skyldner";
import { texasMiddleware } from "./middleware/texasMiddleware";

export const hentKravoversikt = createServerFn()
    .inputValidator(SøkSchema)
    .middleware([texasMiddleware])
    .handler(async ({ data, context }) => {
        const kravoversiktUrl =
            process.env.KRAVOVERSIKT_API_URL ||
            "http://tilbakekreving/internal/kravoversikt";
        const response = await fetch(kravoversiktUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.oboToken}`,
            },
            body: JSON.stringify({
                skyldner: data.søketekst,
                kravfilter: data.kravfilter,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Feilet under henting av kravoversikt: ${response.status} ${response.statusText} - ${await response.text()}`,
            );
        } else {
            return Kravoversikt.parse(await response.json());
        }
    });

const Krav = z.object({
    skeKravidentifikator: z.string(),
    navKravidentifikator: z.string(),
    navReferanse: z.string().nullable(),
    kravtype: z.string(),
    kravbeskrivelse: z.record(z.string(), z.string()),
    gjenståendeBeløp: z.number(),
});

const Oppdragsgiver = z.object({
    organisasjonsnummer: z.string(),
    organisasjonsnavn: z.string().nullable(),
});

const Skyldner = z.object({
    identifikator: z.string(),
    skyldnersNavn: z.string().nullable(),
});

const Kravoversikt = z.object({
    oppdragsgiver: Oppdragsgiver,
    krav: z.array(Krav),
    gjenståendeBeløpForSkyldner: z.number(),
    skyldner: Skyldner,
});

export type Kravoversikt = z.infer<typeof Kravoversikt>;
