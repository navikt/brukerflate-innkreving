// vite.config.ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { injectAuthHeaderPlugin } from "./src/vite-plugins/injectAuthHeaderPlugin";
import { texasTokenExchangePlugin } from "./src/vite-plugins/texasTokenExchangePlugin";
import { mockKravPlugin } from "./src/vite-plugins/mockKravPlugin";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        tanstackStart(),
        viteReact(),
        tailwindcss(),
        //
        nitro().map((plugin) => ({ ...plugin, apply: "build" })),
        // Only add these plugins in development mode
        injectAuthHeaderPlugin(),
        { ...texasTokenExchangePlugin(), apply: "serve" },
        { ...mockKravPlugin(), apply: "serve" },
    ],
});
