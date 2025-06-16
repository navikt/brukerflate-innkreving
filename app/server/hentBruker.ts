import { createServerFn } from "@tanstack/react-start";
import { brukerMiddleware } from "./brukerMiddleware";

export const hentBruker = createServerFn()
    .middleware([brukerMiddleware])
    .handler(({ context }) => {
        return context.bruker;
    });
