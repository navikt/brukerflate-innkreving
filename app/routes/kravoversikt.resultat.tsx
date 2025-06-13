import {createFileRoute} from '@tanstack/react-router'
import {zodValidator} from "@tanstack/zod-adapter";
import {Alert, Loader, Table} from "@navikt/ds-react";
import Kravdetaljer from "../components/Kravdetaljer";
import {hentKravoversikt} from "../server/hentKravoversikt";
import {KravdetaljerRequest} from "../server/hentKravdetaljer";
import {SkyldnerSchema} from "../types/skyldner";
import useKravdetaljer from "../queries/useKravdetaljer";


export const Route = createFileRoute('/kravoversikt/resultat')({
    component: Innkrevingskrav,
    validateSearch: zodValidator(SkyldnerSchema),
    loaderDeps: ({search}) => search,
    loader: ({deps: skyldner}) => hentKravoversikt({data: skyldner}),
    pendingComponent: () => <Loader/>,
    errorComponent: ({error}) => <Alert variant="error">{error.message}</Alert>
})

function Innkrevingskrav() {
    const loaderData = Route.useLoaderData()
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell/>
                    <Table.HeaderCell scope="col" colSpan={2}>Kravidentifikator</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Kravtype</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {loaderData.krav.map(
                    (krav, i) => {
                        const {kravidentifikator, kravtype} = krav;
                        const {id, type} = kravidentifikator;
                        return (
                            <Table.ExpandableRow
                                key={`${id}-${type}-${i}`}
                                content={<KravdetaljerWrapper id={id} type={type}/>}
                                expandOnRowClick
                            >
                                <Table.HeaderCell scope="row">{id ?? "Manlger kravidentifikator"}</Table.HeaderCell>
                                <Table.HeaderCell scope="row">{type}</Table.HeaderCell>
                                <Table.DataCell>{kravtype}</Table.DataCell>
                            </Table.ExpandableRow>
                        );
                    }
                )}
            </Table.Body>
        </Table>
    )
}

function KravdetaljerWrapper(kravdetaljerRequest: KravdetaljerRequest) {
    const kravdetaljer = useKravdetaljer(kravdetaljerRequest)

    if (kravdetaljer.status === "pending") {
        return <Loader/>
    }
    if (kravdetaljer.status === "error") {
        return <Alert variant="error">Feilet ved henting av kravdetaljer</Alert>
    }

    return <Kravdetaljer {...kravdetaljer.data} id={kravdetaljerRequest.id} type={kravdetaljerRequest.type} />
}
