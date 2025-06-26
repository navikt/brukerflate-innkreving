import { createMiddleware } from "@tanstack/react-start";
import { z } from "zod";
import { authorizationHeaderMiddleware } from "./authorizationHeaderMiddleware";

const TexasResponse = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.string(),
});

export const texasMiddleware = createMiddleware({ type: "function" })
    .middleware([authorizationHeaderMiddleware])
    .server(async ({ next, context }) => {
        const texasUrl = process.env["NAIS_TOKEN_EXCHANGE_ENDPOINT"];

        if (texasUrl === undefined) {
            throw new Error("Texas URL miljøvariabel er ikke definert.");
        }

        const response = await fetch(texasUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identity_provider: "azuread",
                target: "api://dev-gcp.utenlandsadresser.tilbakekreving/.default",
                user_token: context.bearerToken,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Klarte ikke å veksle token: ${await response.text()}`,
            );
        }

        const oboToken = TexasResponse.parse(await response.json());

        return await next({
            context: {
                oboToken: oboToken.access_token,
            },
        });
    });
