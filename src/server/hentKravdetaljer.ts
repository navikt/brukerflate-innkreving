import { createServerFn } from "@tanstack/react-start";
import { texasMiddleware } from "./middleware/texasMiddleware";
import {
    PostInternalKravdetaljerBody,
    PostInternalKravdetaljerResponse,
} from "../generated/tilbakekreving/tilbakekrevingAPI";

const hentKravdetaljer = createServerFn()
    .inputValidator(PostInternalKravdetaljerBody)
    .middleware([texasMiddleware])
    .handler(async ({ data, context }) => {
        const kravdetaljerUrl =
            process.env.KRAVDETALJER_API_URL ||
            "http://tilbakekreving/internal/kravdetaljer";
        const response = await fetch(kravdetaljerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.oboToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                "Det skjedde en feil under henting av kravdetaljer.",
            );
        } else {
            if (response.status === 204) {
                return null;
            }
            return PostInternalKravdetaljerResponse.parse(
                await response.json(),
            );
        }
    });

export default hentKravdetaljer;
