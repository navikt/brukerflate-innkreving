import {createFileRoute} from '@tanstack/react-router'
import {createServerFn} from "@tanstack/react-start";
import {z} from "zod";
import {zodValidator} from "@tanstack/zod-adapter";


const SkyldnerSchema = z.object({
    skyldner: z.coerce.string(),
    type: z.enum(['fødselsnummer', 'orgnummer'])
})

const hentKravoversikt = createServerFn()
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
            return response.json()
        }
    })

export const Route = createFileRoute('/kravoversikt')({
    component: Kravoversikt,
    validateSearch: zodValidator(SkyldnerSchema),
    loaderDeps: ({search}) => search,
    loader: ({deps}) => hentKravoversikt({data: deps})
})

function Kravoversikt() {
    const loaderData = Route.useLoaderData()
    return <div>{JSON.stringify(loaderData)}</div>
}
