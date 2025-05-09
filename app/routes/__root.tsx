import type {ReactNode} from 'react'
import {createRootRoute, HeadContent, Outlet, Scripts,} from '@tanstack/react-router'
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
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
                title: 'TanStack Start Starter',
            },
        ],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet/>
            <TanStackRouterDevtools position="bottom-right"/>
            <ReactQueryDevtools buttonPosition="bottom-left"/>
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