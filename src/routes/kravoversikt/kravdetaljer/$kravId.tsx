import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Alert, BoxNew, Loader } from "@navikt/ds-react";
import useKravdetaljer from "../../../queries/useKravdetaljer";
import Kravdetaljer from "../../../components/kravdetaljer/Kravdetaljer";

// Validation schema for search parameters to get the type
const KravIdSearchSchema = z.object({
    type: z.enum(["SKATTEETATEN", "NAV"]),
});

export const Route = createFileRoute("/kravoversikt/kravdetaljer/$kravId")({
    component: KravdetaljerPage,
    validateSearch: KravIdSearchSchema,
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
                <Kravdetaljer {...kravdetaljer.data} id={kravId} type={type} />
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
