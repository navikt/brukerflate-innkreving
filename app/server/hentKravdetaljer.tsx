import {z} from "zod";
import {createServerFn} from "@tanstack/react-start";

const KravdetaljerRequestSchema = z.object({
    id: z.string(),
    type: z.enum(["SKATTEETATEN", "NAV"]),
})

export type KravdetaljerRequest = z.infer<typeof KravdetaljerRequestSchema>

const KravdetaljerSchema = z.object({
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

export type Kravdetaljer = z.infer<typeof KravdetaljerSchema>

const hentKravdetaljer = createServerFn()
    .validator(KravdetaljerRequestSchema)
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
            return KravdetaljerSchema.parse(await response.json())
        }
    })

export default hentKravdetaljer