import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Alert, Loader } from "@navikt/ds-react";
import { hentKravoversikt } from "../server/hentKravoversikt";
import { SkyldnerSchema } from "../types/skyldner";
import Kravtabell from "../components/Kravtabell";
import { ExpandableKravContent } from "../components/ExpandableKravContent";

export const Route = createFileRoute("/kravoversikt/resultat")({
    component: Innkrevingskrav,
    validateSearch: zodValidator(SkyldnerSchema),
    loaderDeps: ({ search }) => search,
    loader: ({ deps: skyldner }) => hentKravoversikt({ data: skyldner }),
    pendingComponent: () => <Loader />,
    errorComponent: ({ error }) => (
        <Alert variant="error">{error.message}</Alert>
    ),
});

function Innkrevingskrav() {
    const loaderData = Route.useLoaderData();
    return (
        <Kravtabell
            krav={loaderData.krav}
            ExpandableContent={ExpandableKravContent}
        />
    );
}
