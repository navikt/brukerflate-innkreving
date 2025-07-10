import { Table } from "@navikt/ds-react";
import { Kravoversikt } from "../server/hentKravoversikt";
import React, { useState } from "react";

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
    const [hoveredRowKeys, setHoveredRowKeys] = useState<Set<string>>(new Set());

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
                        <Table.ExpandableRow
                            key={rowKey}
                            content={
                                hoveredRowKeys.has(rowKey) ?
                                    <ExpandableContent id={id} type={type} />
                                :   null
                            }
                            expandOnRowClick
                            onMouseEnter={() =>
                                setHoveredRowKeys((prev) => {
                                    if (prev.has(rowKey)) {
                                        return prev;
                                    }
                                    const next = new Set(prev);
                                    next.add(rowKey);
                                    return next;
                                })
                            }
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
