import type {ReactNode} from 'react'
import {createRootRouteWithContext, HeadContent, Outlet, Scripts,} from '@tanstack/react-router'
import {BodyShort, Detail, Dropdown, InternalHeader, Link, Page, Spacer} from "@navikt/ds-react";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import navCss from "@navikt/ds-css?url"
import {QueryClient} from "@tanstack/react-query";
import {LeaveIcon} from "@navikt/aksel-icons";

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
            {rel: 'stylesheet', href: navCss}
        ]
    }),
    component: RootComponent,
})


function RootComponent() {
    return (
        <RootDocument>
            <Page>
                <InternalHeader>
                    <InternalHeader.Title as="h1">Innkreving</InternalHeader.Title>
                    <Spacer/>
                    <Dropdown>
                        <InternalHeader.UserButton
                            as={Dropdown.Toggle}
                            name="Ola N."
                            description="Enhet: Skien"
                        />
                        <Dropdown.Menu>
                            <dl>
                                <BodyShort as="dt" size="small">
                                    Ola Normann
                                </BodyShort>
                                <Detail as="dd">D123456</Detail>
                            </dl>
                            <Dropdown.Menu.Divider/>
                            <Dropdown.Menu.List>
                                <Dropdown.Menu.List.Item as={Link} href="/oauth2/logout?redirect=/kravoversikt">
                                    Logg ut <Spacer/> <LeaveIcon aria-hidden fontSize="1.5rem"/>
                                </Dropdown.Menu.List.Item>
                            </Dropdown.Menu.List>
                        </Dropdown.Menu>
                    </Dropdown>
                </InternalHeader>
                <Page.Block as="main" width="2xl" gutters>
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