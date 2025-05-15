import {createFileRoute} from '@tanstack/react-router'
import {createServerFn} from "@tanstack/react-start";
import {z} from "zod";
import {zodValidator} from "@tanstack/zod-adapter";
import {Alert, Table} from "@navikt/ds-react";
import Kravdetaljer, {KravdetaljerProps} from "../components/Kravdetaljer";


const SkyldnertypeSchema = z.enum(['fødselsnummer', 'orgnummer']);
const SkyldnerSchema = z.object({
    skyldner: z.coerce.string(),
    type: SkyldnertypeSchema
})

const KravSchema = z.object({
    kravidentifikator: z.object({
        type: z.string(),
        id: z.string(),
    }),
    kravtype: z.string(),
})

const KravoversiktSchema = z.object({
    krav: z.array(KravSchema)
})

const hentKravoversikt = createServerFn()
    .validator(SkyldnerSchema)
    .handler(async ({data}) => {
        const response = await fetch(
            'https://utenlandsadresser-tilbakekreving.intern.dev.nav.no/internal/kravoversikt',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: data.skyldner,
                    type: data.type,
                })
            }
        )

        if (!response.ok) {
            throw new Error('Feilet under henting av kravoversikt')
        } else {
            return KravoversiktSchema.parse(await response.json())
        }
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
                            <Table.ExpandableRow key={`${id}-${type}-${i}`} content={KravdetaljerWrapper()}>
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
    const kravdetaljerProps: KravdetaljerProps = {
        kravgrunnlag: {
            datoNårKravVarBesluttetHosOppdragsgiver: "2022"
        },
        kravlinjer: [
            {
                kravlinjetype: "type",
                opprinneligBeløp: 100,
                gjenståendeBeløp: 50,
            }
        ]
    }

    return <Kravdetaljer {...kravdetaljerProps} />
}

export type Skyldnertype = z.infer<typeof SkyldnertypeSchema>
export {SkyldnerSchema}
