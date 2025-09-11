import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SkyldnerSchema } from "../types/skyldner";
import SkyldnerSøkeskjema from "../components/SkyldnerSøkeskjema";
import { HGrid } from "@navikt/ds-react";
import { Route as resultatRoute } from "./kravoversikt.resultat";

export const Route = createFileRoute("/kravoversikt")({
    component: Kravoversikt,
    validateSearch: SkyldnerSchema,
});

function Kravoversikt() {
    const search = Route.useSearch();
    return (
        <HGrid columns="1fr 4fr" className="pt-4">
            <SkyldnerSøkeskjema
                initiellSkyldner={search?.skyldner}
                initiellType={search?.type}
                initiellKravfilter={search?.kravfilter}
                action={resultatRoute.path}
            />
            <Outlet />
        </HGrid>
    );
}
