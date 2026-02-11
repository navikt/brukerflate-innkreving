import { createFileRoute } from "@tanstack/react-router";
import { Alert, BoxNew, Loader } from "@navikt/ds-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Kravdetaljer from "../../../components/kravdetaljer/Kravdetaljer";
import { PostInternalKravdetaljerBody } from "../../../generated/tilbakekreving/tilbakekrevingAPI";
import { kravdetaljerQueryOptions } from "../../../queries/useKravdetaljer";

export const Route = createFileRoute("/kravoversikt/kravdetaljer/$kravId")({
    component: KravdetaljerPage,
    validateSearch: PostInternalKravdetaljerBody.pick({ type: true }),
    loaderDeps: ({ search: { type } }) => ({ type }),
    loader: ({
        params: { kravId },
        deps: { type },
        context: { queryClient },
    }) =>
        queryClient.ensureQueryData(
            kravdetaljerQueryOptions({ id: kravId, type }),
        ),
    pendingComponent: () => (
        <BoxNew
            padding="space-16"
            borderColor="accent-subtle"
            borderWidth="1"
            borderRadius="large"
        >
            <Loader size="3xlarge" title="Henter kravdetaljer" />
        </BoxNew>
    ),
    errorComponent: ({ error }) => (
        <BoxNew
            padding="space-16"
            borderColor="accent-subtle"
            borderWidth="1"
            borderRadius="large"
        >
            <Alert variant="error">
                Feilet ved henting av kravdetaljer: {error.message}
            </Alert>
        </BoxNew>
    ),
});

function KravdetaljerPage() {
    const { kravId } = Route.useParams();
    const { type } = Route.useSearch();

    const { data } = useSuspenseQuery(
        kravdetaljerQueryOptions({ id: kravId, type }),
    );

    return (
        <BoxNew
            padding="space-16"
            borderColor="accent-subtle"
            borderWidth="1"
            borderRadius="large"
        >
            {data === null ?
                <Alert variant="info">Fant ingen krav</Alert>
            :   <Kravdetaljer kravdetaljer={data} />}
        </BoxNew>
    );
}
