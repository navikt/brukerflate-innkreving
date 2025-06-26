// vite.config.ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { injectAuthHeaderPlugin } from "./src/vite-plugins/injectAuthHeaderPlugin";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        tanstackStart(),
        // Only add the devAuthPlugin in development mode
        { ...injectAuthHeaderPlugin(), apply: "serve" },
    ],
});
