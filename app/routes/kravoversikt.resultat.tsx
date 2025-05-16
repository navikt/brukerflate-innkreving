import {createFileRoute} from '@tanstack/react-router'
import {z} from "zod";
import {zodValidator} from "@tanstack/zod-adapter";
import {Alert, Loader, Table} from "@navikt/ds-react";
import Kravdetaljer from "../components/Kravdetaljer";
import {useQuery} from "@tanstack/react-query";
import {hentKravoversikt} from "../server/hentKravoversikt";
import {hentKravdetaljer} from "../server/hentKravdetaljer";


const SkyldnertypeSchema = z.enum(['fødselsnummer', 'orgnummer']);
const SkyldnerSchema = z.object({
    skyldner: z.coerce.string(),
    type: SkyldnertypeSchema
})

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
                                content={<KravdetaljerWrapper/>}
                                expandOnRowClick
                            >
                                <Table.HeaderCell scope="row">{id}</Table.HeaderCell>
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

function KravdetaljerWrapper() {
    const kravdetaljer = useQuery({
        queryKey: ["87b5a5c6-17ea-413a-ad80-b6c3406188fa"],
        queryFn: () => hentKravdetaljer({
            data: {
                id: "87b5a5c6-17ea-413a-ad80-b6c3406188fa",
                type: "SKATTEETATEN"
            }
        })
    })

    if (kravdetaljer.status === "pending") {
        return <Loader/>
    }
    if (kravdetaljer.status === "error") {
        return <Alert variant="error">Feilet ved henting av kravdetaljer</Alert>
    }

    return <Kravdetaljer {...kravdetaljer.data} />
}

export type Skyldnertype = z.infer<typeof SkyldnertypeSchema>
export {SkyldnerSchema}
