import {createMiddleware} from "@tanstack/react-start";
import {getHeader} from "@tanstack/react-start/server";
import {z} from "zod";

const TexasResponse = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.string(),
})

export const texasMiddleware = createMiddleware().server(async ({next}) => {
    const authorizationHeader = getHeader('Authorization')

    if (authorizationHeader === undefined) {
        throw new Error('No authorization header present in request.')
    }

    const texasUrl = process.env['NAIS_TOKEN_EXCHANGE_ENDPOINT']

    if (texasUrl === undefined) {
        throw new Error('Texas URL environment variable is not defined.')
    }

    const response = await fetch(texasUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            identity_provider: 'azuread',
            target: 'api://dev-gcp.utenlandsadresser.tilbakekreving/.default',
            user_token: authorizationHeader.split(' ')[1]
        })
    })

    if (!response.ok) {
        throw new Error(`Failed to exchange token: ${await response.text()}`)
    }

    const oboToken = TexasResponse.parse(await response.json())

    return await next({
        context: {
            oboToken: oboToken.access_token
        }
    })
})