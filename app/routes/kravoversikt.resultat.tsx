import {createFileRoute} from '@tanstack/react-router'
import {zodValidator} from "@tanstack/zod-adapter";
import {Alert, Loader, Table} from "@navikt/ds-react";
import Kravdetaljer from "../components/Kravdetaljer";
import {useQuery} from "@tanstack/react-query";
import {hentKravoversikt} from "../server/hentKravoversikt";
import {hentKravdetaljer} from "../server/hentKravdetaljer";
import {SkyldnerSchema} from "../types/skyldner";
import {z} from 'zod';


export const Route = createFileRoute('/kravoversikt/resultat')({
    component: Resultat,
    validateSearch: zodValidator(SkyldnerSchema),
    loaderDeps: ({search}) => search,
    loader: ({deps}) => hentKravoversikt({data: deps}),
    errorComponent: ({error}) => <Alert variant="error">{error.message}</Alert>
})

function Resultat() {
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

const KravdetaljerWrapperPropsSchema = z.object({
    id: z.string(),
    type: z.enum(["SKATTEETATEN", "NAV"]),
})

type KravdetaljerWrapperProps = z.infer<typeof KravdetaljerWrapperPropsSchema>

function KravdetaljerWrapper({id, type}: KravdetaljerWrapperProps) {
    const kravdetaljer = useQuery({
        queryKey: ["kravdetaljer", id, type],
        queryFn: () => hentKravdetaljer({data: {id, type,}})
    })

    if (kravdetaljer.status === "pending") {
        return <Loader/>
    }
    if (kravdetaljer.status === "error") {
        return <Alert variant="error">Feilet ved henting av kravdetaljer</Alert>
    }

    return <Kravdetaljer {...kravdetaljer.data} />
}
