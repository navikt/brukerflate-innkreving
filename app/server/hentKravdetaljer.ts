import {z} from "zod";
import {createServerFn} from "@tanstack/react-start";
import {texasMiddleware} from "./texasMiddleware";

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
    ),
})

export type Kravdetaljer = z.infer<typeof KravdetaljerSchema>

const hentKravdetaljer = createServerFn()
    .validator(KravdetaljerRequestSchema)
    .middleware([texasMiddleware])
    .handler(async ({data, context}) => {
        const response = await fetch(
            'http://tilbakekreving/internal/kravdetaljer',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${context.oboToken}`
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