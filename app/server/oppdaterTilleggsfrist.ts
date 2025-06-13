import {z} from "zod";
import {createServerFn} from "@tanstack/react-start";
import {texasMiddleware} from "./texasMiddleware";

const OppdaterTilleggsfristRequestSchema = z.object({
    id: z.string(),
    type: z.enum(["SKATTEETATEN", "NAV"]),
    tilleggsfrist: z.string().date(),
})

export type OppdaterTilleggsfristRequest = z.infer<typeof OppdaterTilleggsfristRequestSchema>

const oppdaterTilleggsfrist = createServerFn()
    .validator(OppdaterTilleggsfristRequestSchema)
    .middleware([texasMiddleware])
    .handler(async ({data, context}) => {
        const response = await fetch(
            'http://tilbakekreving/internal/tilleggsfrist',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${context.oboToken}`
                },
                body: JSON.stringify({
                    id: data.id,
                    type: data.type,
                    tilleggsfrist: data.tilleggsfrist,
                })
            }
        )

        if (!response.ok) {
            throw new Error('Feilet under oppdatering av tilleggsfrist')
        }
    })

export default oppdaterTilleggsfrist
