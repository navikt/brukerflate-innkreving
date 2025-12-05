import { createMiddleware } from "@tanstack/react-start";
import { authorizationHeaderMiddleware } from "./authorizationHeaderMiddleware";
import { decodeJwt } from "jose";
import { z } from "zod";

export const brukerMiddleware = createMiddleware({ type: "function" })
    .middleware([authorizationHeaderMiddleware])
    .server(async ({ next, context }) => {
        const payload = decodeJwt(context.bearerToken);

        const bruker = BrukerJwt.safeParse(payload);

        if (!bruker.success) {
            throw new Error(`Feil format på brukers JWT: ${bruker.error}`);
        }

        return await next({
            context: {
                bruker: {
                    navIdent: bruker.data.NAVident,
                    foretrukketBrukernavn: bruker.data.preferred_username,
                    navn: bruker.data.name,
                    grupper: bruker.data.groups,
                },
            },
        });
    });

const BrukerJwt = z.object({
    NAVident: z.string(),
    preferred_username: z.string(),
    name: z.string(),
    groups: z.array(z.string()),
});
