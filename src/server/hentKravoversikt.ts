import { createServerFn } from "@tanstack/react-start";
import { texasMiddleware } from "./middleware/texasMiddleware";
import {
    PostInternalKravoversiktBody,
    PostInternalKravoversiktResponse,
} from "../generated/tilbakekreving/tilbakekrevingAPI";

const hentKravoversikt = createServerFn()
    .inputValidator(PostInternalKravoversiktBody)
    .middleware([texasMiddleware])
    .handler(async ({ data, context }) => {
        const kravoversiktUrl =
            process.env.KRAVOVERSIKT_API_URL ||
            "http://tilbakekreving/internal/kravoversikt";
        const response = await fetch(kravoversiktUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.oboToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                "Det skjedde en feil under henting av kravoversikt.",
            );
        } else {
            return PostInternalKravoversiktResponse.parse(await response.json());
        }
    });

export default hentKravoversikt;
