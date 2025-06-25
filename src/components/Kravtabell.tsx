import { Table } from "@navikt/ds-react";
import { Kravoversikt } from "../server/hentKravoversikt";
import React from "react";

type KravIdentifikator = Kravoversikt["krav"][number]["kravidentifikator"];

interface KravtabellProps {
    krav: Kravoversikt["krav"];
    ExpandableContent: React.ComponentType<{
        id: string;
        type: KravIdentifikator["type"];
    }>;
}

export default function Kravtabell({
    krav,
    ExpandableContent,
}: KravtabellProps) {
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
                            content={<ExpandableContent id={id} type={type} />}
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
