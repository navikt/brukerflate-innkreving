import { createFileRoute } from "@tanstack/react-router";
import { Alert, BoxNew, Loader } from "@navikt/ds-react";
import useKravdetaljer from "../../../queries/useKravdetaljer";
import Kravdetaljer from "../../../components/kravdetaljer/Kravdetaljer";
import { PostInternalKravdetaljerBody } from "../../../generated/tilbakekreving/tilbakekrevingAPI";

export const Route = createFileRoute("/kravoversikt/kravdetaljer/$kravId")({
    component: KravdetaljerPage,
    validateSearch: PostInternalKravdetaljerBody.pick({ type: true }),
});

function KravdetaljerPage() {
    const { kravId } = Route.useParams();
    const { type } = Route.useSearch();

    const kravdetaljer = useKravdetaljer({ id: kravId, type });

    return (
        <BoxNew
            padding="space-16"
            borderColor="accent-subtle"
            borderWidth="1"
            borderRadius="large"
        >
            {kravdetaljer.data && (
                <Kravdetaljer kravdetaljer={kravdetaljer.data} />
            )}
            {kravdetaljer.data === null && (
                <Alert variant="info">Fant ingen krav</Alert>
            )}
            {kravdetaljer.isPending && (
                <Loader size="3xlarge" title="Henter kravdetaljer" />
            )}
            {kravdetaljer.isError && (
                <Alert variant="error">
                    Feilet ved henting av kravdetaljer:{" "}
                    {kravdetaljer.error?.message}
                </Alert>
            )}
        </BoxNew>
    );
}
