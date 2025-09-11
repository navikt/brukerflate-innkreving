import { Kravoversikt } from "../../server/hentKravoversikt";
import useKravdetaljer from "../../queries/useKravdetaljer";
import { Alert, Loader } from "@navikt/ds-react";
import Kravdetaljer from "./Kravdetaljer";

export function ExpandableKravContent({
    id,
    type,
}: {
    id: string;
    type: Kravoversikt["krav"][number]["kravidentifikator"]["type"];
}) {
    const kravdetaljer = useKravdetaljer({ kravId: id, type });

    if (kravdetaljer.status === "pending") {
        return <Loader />;
    }
    if (kravdetaljer.status === "error") {
        return (
            <Alert variant="error">Feilet ved henting av kravdetaljer</Alert>
        );
    }

    return <Kravdetaljer {...kravdetaljer.data} id={id} type={type} />;
}
