import type { ReactNode } from "react";
import {
    createRootRouteWithContext,
    HeadContent,
    Outlet,
    Scripts,
} from "@tanstack/react-router";
import { InternalHeader, Page, Spacer, Theme } from "@navikt/ds-react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import navCss from "@navikt/ds-css/darkside?url";
import appCss from "../style/app.css?url";
import tailwind from "../style/tailwind.css?url";
import favicon from "../favicon.png?url";
import { QueryClient } from "@tanstack/react-query";
import { hentBruker } from "../server/hentBruker";
import { BrukerDropdown } from "../components/BrukerDropdown";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "Innkreving",
            },
        ],
        links: [
            { rel: "stylesheet", href: navCss, type: "text/css" },
            { rel: "stylesheet", href: tailwind, type: "text/css" },
            { rel: "stylesheet", href: appCss, type: "text/css" },
            { rel: "icon", href: favicon, type: "image/png" },
        ],
    }),
    loader: () => hentBruker(),
    staleTime: Infinity,
    component: RootComponent,
});

function RootComponent() {
    const bruker = Route.useLoaderData();

    return (
        <RootDocument>
            <Theme theme="dark">
                <Page>
                    <InternalHeader>
                        <InternalHeader.Title as="h1">
                            Innkreving
                        </InternalHeader.Title>
                        <Spacer />
                        <BrukerDropdown
                            foretrukketBrukernavn={bruker.foretrukketBrukernavn}
                            navIdent={bruker.navIdent}
                        />
                    </InternalHeader>
                    <Page.Block as="main" gutters className="mt-6">
                        <Outlet />
                    </Page.Block>
                    <TanStackRouterDevtools position="bottom-right" />
                </Page>
            </Theme>
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
                <title>Innkreving</title>
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}
