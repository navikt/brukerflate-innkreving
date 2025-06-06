import {createMiddleware} from "@tanstack/react-start";
import {getHeader} from "@tanstack/react-start/server";

export const authorizationHeaderMiddleware = createMiddleware().server(async ({next}) => {
    const authorizationHeader = getHeader('Authorization')

    if (authorizationHeader === undefined) {
        throw new Error('Ingen autorisasjonsheader finnes i forespørselen.')
    }

    const bearerToken = authorizationHeader.split(' ').at(1)

    if (bearerToken === undefined) {
        throw new Error('Autorisasjonsheaderen er feilformatert.')
    }

    return await next({
        context: {
            bearerToken: bearerToken
        }
    })
})