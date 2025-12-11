import type { ViteDevServer } from "vite";

/**
 * Resolve the base URL (protocol://host:port) for the running Vite dev server.
 * Trailing slash is removed.
 */
export function resolveDevServerBaseUrl(server: ViteDevServer): string {
    const url =
        server.resolvedUrls?.local?.[0] ??
        server.resolvedUrls?.network?.[0] ??
        (() => {
            const addr = server.httpServer?.address();
            if (addr && typeof addr === "object") {
                const host = server.config.server?.host || "localhost";
                const protocol = server.config.server?.https ? "https" : "http";
                return `${protocol}://${host}:${addr.port}`;
            }
            return `http://localhost:${server.config.server?.port ?? 5173}`;
        })();

    return url.replace(/\/$/, "");
}
