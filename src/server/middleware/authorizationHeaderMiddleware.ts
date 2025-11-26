import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

export const authorizationHeaderMiddleware = createMiddleware({
    type: "function",
}).server(async ({ next }) => {
    const authorizationHeader = getRequestHeader("Authorization");

    if (authorizationHeader === undefined) {
        throw new Error("Ingen autorisasjonsheader finnes i forespørselen.");
    }

    const bearerToken = authorizationHeader.split(" ").at(1);

    if (bearerToken === undefined) {
        throw new Error("Autorisasjonsheaderen er feilformatert.");
    }

    return await next({
        context: {
            bearerToken: bearerToken,
        },
    });
});
