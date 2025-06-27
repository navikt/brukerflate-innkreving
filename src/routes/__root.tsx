import type { ReactNode } from "react";
import {
    createRootRouteWithContext,
    HeadContent,
    Outlet,
    Scripts,
} from "@tanstack/react-router";
import {
    BodyShort,
    Detail,
    Dropdown,
    InternalHeader,
    Link,
    Page,
    Spacer,
} from "@navikt/ds-react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import navCss from "@navikt/ds-css?url";
import appCss from "../style/app.css?url";
import favicon from "../favicon.png?url"
import { QueryClient } from "@tanstack/react-query";
import { LeaveIcon } from "@navikt/aksel-icons";
import { hentBruker } from "../server/hentBruker";

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
            { rel: "stylesheet", href: appCss, type: "text/css" },
            { rel: "icon", href: favicon, type: "image/png" },
        ],
    }),
    loader: () => hentBruker(),
    component: RootComponent,
});

function RootComponent() {
    const bruker = Route.useLoaderData();

    return (
        <RootDocument>
            <Page>
                <InternalHeader>
                    <InternalHeader.Title as="h1">
                        Innkreving
                    </InternalHeader.Title>
                    <Spacer />
                    <Dropdown>
                        <InternalHeader.UserButton
                            as={Dropdown.Toggle}
                            name={bruker.foretrukketBrukernavn}
                        />
                        <Dropdown.Menu>
                            <dl>
                                <BodyShort as="dt" size="small">
                                    {bruker.foretrukketBrukernavn}
                                </BodyShort>
                                <Detail as="dd">{bruker.navIdent}</Detail>
                            </dl>
                            <Dropdown.Menu.Divider />
                            <Dropdown.Menu.List>
                                <Dropdown.Menu.List.Item
                                    as={Link}
                                    href="/oauth2/logout?redirect=/kravoversikt"
                                >
                                    Logg ut <Spacer />{" "}
                                    <LeaveIcon aria-hidden fontSize="1.5rem" />
                                </Dropdown.Menu.List.Item>
                            </Dropdown.Menu.List>
                        </Dropdown.Menu>
                    </Dropdown>
                </InternalHeader>
                <Page.Block as="main" width="2xl" gutters>
                    <Outlet />
                </Page.Block>
                <TanStackRouterDevtools position="bottom-right" />
                {/*<ReactQueryDevtools buttonPosition="bottom-left"/>*/}
            </Page>
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}
