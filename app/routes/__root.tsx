import type {ReactNode} from 'react'
import {createRootRouteWithContext, HeadContent, Outlet, Scripts,} from '@tanstack/react-router'
import {Heading, Page} from "@navikt/ds-react";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import navCss from "@navikt/ds-css?url"
import {QueryClient} from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Innkreving',
            },
        ],
        links: [
            {rel: 'stylesheet', href: navCss }
        ]
    }),
    component: RootComponent,
})


function RootComponent() {
    return (
        <RootDocument>
            <Page>
                <Page.Block width="2xl" gutters>
                    <Heading level="1" size="large">Innkreving</Heading>
                </Page.Block>
                <Page.Block width="2xl" gutters>
                    <Outlet/>
                </Page.Block>
                <TanStackRouterDevtools position="bottom-right"/>
                {/*<ReactQueryDevtools buttonPosition="bottom-left"/>*/}
            </Page>
        </RootDocument>
    )
}

function RootDocument({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html>
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <Scripts/>
        </body>
        </html>
    )
}