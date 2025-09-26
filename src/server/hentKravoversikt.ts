import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { SøkSchema } from "../types/skyldner";
import { texasMiddleware } from "./middleware/texasMiddleware";

const Krav = z.object({
    kravidentifikator: z.object({
        type: z
            .string()
            .transform((v) => v.toUpperCase())
            .pipe(z.enum(["SKATTEETATEN", "NAV"])),
        // TODO: Fjern når endepunktet returnerer faktiske verdier
        id: z.string().nonempty().catch("87b5a5c6-17ea-413a-ad80-b6c3406188fa"),
    }),
    kravtype: z.string(),
});

export type Krav = z.infer<typeof Krav>;

const Kravoversikt = z.object({
    krav: z.array(Krav),
});

export type Kravoversikt = z.infer<typeof Kravoversikt>;

export const hentKravoversikt = createServerFn()
    .validator(SøkSchema)
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
                søketekst: data.søketekst,
                søketype: data.søketype,
                kravfilter: data.kravfilter,
            }),
        });

        if (!response.ok) {
            throw new Error(`Feilet under henting av kravoversikt: ${response.status} ${response.statusText} - ${await response.text()}`);
        } else {
            return Kravoversikt.parse(await response.json());
        }
    });
