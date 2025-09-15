import { Table } from "@navikt/ds-react";
import { Link as RouterLink } from "@tanstack/react-router";
import { Kravoversikt } from "../server/hentKravoversikt";
import React from "react";
import { Route as KravoversiktRoute } from "../routes/kravoversikt";

interface KravtabellProps {
    krav: Kravoversikt["krav"];
}

export default function Kravtabell({ krav }: KravtabellProps) {
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
                    const rowKey = `${id}-${type}-${i}`;

                    return (
                        <RouterLink
                            key={rowKey}
                            from={KravoversiktRoute.fullPath}
                            to="/kravoversikt/kravdetaljer/$kravId"
                            params={{ kravId: id }}
                            search={{ type }}
                        >
                            <Table.Row>
                                <Table.HeaderCell scope="row">
                                    {id ?? "Manlger kravidentifikator"}
                                </Table.HeaderCell>
                                <Table.HeaderCell scope="row">
                                    {type}
                                </Table.HeaderCell>
                                <Table.DataCell>{kravtype}</Table.DataCell>
                            </Table.Row>
                        </RouterLink>
                    );
                })}
            </Table.Body>
        </Table>
    );
}
