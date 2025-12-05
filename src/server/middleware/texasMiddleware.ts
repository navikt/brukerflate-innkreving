import { createMiddleware } from "@tanstack/react-start";
import { z } from "zod";
import { authorizationHeaderMiddleware } from "./authorizationHeaderMiddleware";

export const texasMiddleware = createMiddleware({ type: "function" })
    .middleware([authorizationHeaderMiddleware])
    .server(async ({ next, context }) => {
        const texasUrl = process.env["NAIS_TOKEN_EXCHANGE_ENDPOINT"];
        const target = process.env["TILBAKEKREVING_TARGET"];

        if (texasUrl === undefined) {
            throw new Error("Texas URL miljøvariabel er ikke definert.");
        }

        if (target === undefined) {
            throw new Error("Target miljøvariabel er ikke definert.");
        }

        const response = await fetch(texasUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identity_provider: "azuread",
                target,
                user_token: context.bearerToken,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Klarte ikke å veksle token med Texas: ${await response.text()}`,
            );
        }

        const oboToken = TexasResponse.parse(await response.json());

        return await next({
            context: {
                oboToken: oboToken.access_token,
            },
        });
    });

const TexasResponse = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.string(),
});
