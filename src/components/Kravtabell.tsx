import { Alert, Loader, Table } from "@navikt/ds-react";
import { KravdetaljerRequest } from "../server/hentKravdetaljer";
import useKravdetaljer from "../queries/useKravdetaljer";
import Kravdetaljer from "./Kravdetaljer";
import { Kravoversikt } from "../server/hentKravoversikt";

export default function Kravtabell({ krav }: Kravoversikt) {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell scope="col" colSpan={2}>
                        Kravidentifikator
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">Kravtype</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {krav.map((krav, i) => {
                    const { kravidentifikator, kravtype } = krav;
                    const { id, type } = kravidentifikator;
                    return (
                        <Table.ExpandableRow
                            key={`${id}-${type}-${i}`}
                            content={
                                <KravdetaljerWrapper id={id} type={type} />
                            }
                            expandOnRowClick
                        >
                            <Table.HeaderCell scope="row">
                                {id ?? "Manlger kravidentifikator"}
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="row">
                                {type}
                            </Table.HeaderCell>
                            <Table.DataCell>{kravtype}</Table.DataCell>
                        </Table.ExpandableRow>
                    );
                })}
            </Table.Body>
        </Table>
    );
}

function KravdetaljerWrapper(kravdetaljerRequest: KravdetaljerRequest) {
    const kravdetaljer = useKravdetaljer(kravdetaljerRequest);

    if (kravdetaljer.status === "pending") {
        return <Loader />;
    }
    if (kravdetaljer.status === "error") {
        return (
            <Alert variant="error">Feilet ved henting av kravdetaljer</Alert>
        );
    }

    return (
        <Kravdetaljer
            {...kravdetaljer.data}
            id={kravdetaljerRequest.id}
            type={kravdetaljerRequest.type}
        />
    );
}
