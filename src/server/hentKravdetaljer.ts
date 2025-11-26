import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { texasMiddleware } from "./middleware/texasMiddleware";

const KravdetaljerRequestSchema = z.object({
    id: z.string(),
    type: z.enum(["SKATTEETATEN", "NAV"]),
});

const hentKravdetaljer = createServerFn()
    .inputValidator(KravdetaljerRequestSchema)
    .middleware([texasMiddleware])
    .handler(async ({ data, context }) => {
        const kravdetaljerUrl =
            process.env.KRAVDETALJER_API_URL ||
            "http://tilbakekreving/internal/kravdetaljer";
        const response = await fetch(kravdetaljerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.oboToken}`,
            },
            body: JSON.stringify({
                id: data.id,
                type: data.type,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Feilet under henting av kravdetaljer: ${response.status} ${response.statusText}`,
            );
        } else {
            return KravdetaljerSchema.parse(await response.json());
        }
    });

export type KravdetaljerRequest = z.infer<typeof KravdetaljerRequestSchema>;

const Kravgrunnlag = z.object({
    oppdragsgiversKravidentifikator: z.string(),
    oppdragsgiversReferanse: z.string(),
});

const Kravlinje = z.object({
    kravlinjetype: z.string(),
    opprinneligBeløp: z.number(),
    gjenståendeBeløp: z.number(),
    kravlinjeBeskrivelse: z.record(z.string(), z.string()),
});

const InnbetalingPlassertMotKrav = z.object({
    innbetalingsIdentifikator: z.string(),
    innbetalingstype: z.string(),
    innbetalingsdato: z.string(),
    innbetaltBeløp: z.number(),
});

const PeriodeMedTvangsmulkt = z.object({
    fom: z.string(),
    tom: z.string(),
});

const YtelseForAvregningBeløp = z.object({
    valuta: z.string(),
    beløp: z.number(),
});

const Tilbakekrevingsperiode = z.object({
    fom: z.string(),
    tom: z.string(),
});

const Tilleggsinformasjon = z.object({
    type: z.string(),
    periode: PeriodeMedTvangsmulkt.nullable().optional(),
    stoppdatoForLøpendeMulkt: z.string().nullable().optional(),
    ytelserForAvregning: YtelseForAvregningBeløp.nullable().optional(),
    tilbakekrevingsperiode: Tilbakekrevingsperiode.nullable().optional(),
});

const KravDetalj = z.object({
    forfallsdato: z.string(),
    foreldelsesdato: z.string(),
    fastsettelsesdato: z.string(),
    kravtype: z.string(),
    opprinneligBeløp: z.number(),
    gjenståendeBeløp: z.number(),
    skatteetatensKravidentifikator: z.string(),
    kravlinjer: z.array(Kravlinje),
    kravgrunnlag: Kravgrunnlag,
    innbetalingerPlassertMotKrav: z.array(InnbetalingPlassertMotKrav),
    tilleggsinformasjon: Tilleggsinformasjon.nullable().optional(),
});

const Oppdragsgiver = z.object({
    organisasjonsnummer: z.string(),
    organisasjonsnavn: z.string(),
});

const Skyldner = z.object({
    identifikator: z.string(),
    skyldnersNavn: z.string().nullable(),
});

const Avvik = z.object({
    avvikstype: z.string(),
    utdypendeAvviksbeskrivelse: z.string(),
});

const KravdetaljerSchema = z.object({
    krav: KravDetalj,
    oppdragsgiver: Oppdragsgiver,
    skyldner: Skyldner,
    avvik: Avvik.nullable().optional(),
});
export type Kravdetaljer = z.infer<typeof KravdetaljerSchema>;

export type Avvik = z.infer<typeof Avvik>;

export default hentKravdetaljer;
