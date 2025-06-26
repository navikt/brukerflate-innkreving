// vite.config.ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { injectAuthHeaderPlugin } from "./src/vite-plugins/injectAuthHeaderPlugin";
import { texasTokenExchangePlugin } from "./src/vite-plugins/texasTokenExchangePlugin";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        tanstackStart(),
        // Only add these plugins in development mode
        { ...injectAuthHeaderPlugin(), apply: "serve" },
        { ...texasTokenExchangePlugin(), apply: "serve" },
    ],
});
