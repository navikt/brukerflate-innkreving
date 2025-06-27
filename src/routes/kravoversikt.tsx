import { createFileRoute, Outlet } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { SkyldnerSchema } from "../types/skyldner";
import SkyldnerSøkeskjema from "../components/SkyldnerSøkeskjema";

export const Route = createFileRoute("/kravoversikt")({
    component: Kravoversikt,
    validateSearch: zodValidator(SkyldnerSchema),
});

function Kravoversikt() {
    const search = Route.useSearch();
    return (
        <div className="pt-4">
            <SkyldnerSøkeskjema
                initiellSkyldner={search?.skyldner}
                initiellType={search?.type}
                action="/kravoversikt/resultat"
            />
            <Outlet />
        </div>
    );
}
