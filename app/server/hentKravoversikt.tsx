import {z} from "zod";
import {createServerFn} from "@tanstack/react-start";
import {SkyldnerSchema} from "../routes/kravoversikt.resultat";

const Krav = z.object({
    kravidentifikator: z.object({
        type: z.string(),
        id: z.string(),
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
            'https://utenlandsadresser-tilbakekreving.intern.dev.nav.no/internal/kravoversikt',
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