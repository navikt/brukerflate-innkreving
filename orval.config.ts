import { defineConfig } from "orval";

const apiSpecificationUrl =
    "https://utenlandsadresser-tilbakekreving.intern.dev.nav.no/swagger/documentation.yaml";

export default defineConfig({
    tilbakekrevingZod: {
        output: {
            client: "zod",
            mode: "single",
            target: "./src/generated/tilbakekreving",
            schemas: "./src/generated/model",
        },
        input: apiSpecificationUrl,
    },
});
