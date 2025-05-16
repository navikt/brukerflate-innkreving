import {z} from "zod";
import {createServerFn} from "@tanstack/react-start";

const KravdetaljerRequest = z.object({
    id: z.string(),
    type: z.enum(["SKATTEETATEN", "NAV"]),
})

const Kravdetaljer = z.object({
    kravgrunnlag: z.object({
        datoNårKravVarBesluttetHosOppdragsgiver: z.string()
    }),
    kravlinjer: z.array(
        z.object({
            kravlinjetype: z.string(),
            opprinneligBeløp: z.number(),
            gjenståendeBeløp: z.number(),
        })
    )
})

export const hentKravdetaljer = createServerFn()
    .validator(KravdetaljerRequest)
    .handler(async ({data}) => {
        const response = await fetch(
            'https://utenlandsadresser-tilbakekreving.intern.dev.nav.no/internal/kravdetaljer',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: data.id,
                    type: data.type,
                })
            }
        )

        if (!response.ok) {
            throw new Error('Feilet under henting av kravoversikt')
        } else {
            return Kravdetaljer.parse(await response.json())
        }
    })