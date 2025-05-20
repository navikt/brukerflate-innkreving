import {z} from "zod";
import {createServerFn} from "@tanstack/react-start";
import {SkyldnerSchema} from "../types/skyldner";

const Krav = z.object({
    kravidentifikator: z.object({
        // TODO: Endre backend til å returnere upper case
        type: z.enum(["skatteetaten", "nav"]).transform(v => v.toUpperCase()).pipe(z.enum(["SKATTEETATEN", "NAV"])),
        // TODO: Fjern når endepunktet returnerer faktiske verdier
        id: z.string().nonempty().catch("87b5a5c6-17ea-413a-ad80-b6c3406188fa"),
    }),
    kravtype: z.string(),
})

const Kravoversikt = z.object({
    krav: z.array(Krav)
})

export const hentKravoversikt = createServerFn()
    .validator(SkyldnerSchema)
    .handler(async ({data}) => {
        const response = await fetch(
            'http://tilbakekreving/internal/kravoversikt',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: data.skyldner,
                    type: data.type,
                })
            }
        )

        if (!response.ok) {
            throw new Error('Feilet under henting av kravoversikt')
        } else {
            return Kravoversikt.parse(await response.json())
        }
    })