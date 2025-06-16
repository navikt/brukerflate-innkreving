import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

export function createRouter() {
    const queryClient = new QueryClient();

    const router = createTanStackRouter({
        routeTree,
        context: { queryClient },
        scrollRestoration: true,
    });

    return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
