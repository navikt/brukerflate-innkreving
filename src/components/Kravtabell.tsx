import { Table } from "@navikt/ds-react";
import { Kravoversikt } from "../server/hentKravoversikt";
import React from "react";
import { Route as KravdetaljerRoute } from "../routes/kravoversikt/kravdetaljer/$kravId";

interface KravtabellProps {
    krav: Kravoversikt["krav"];
}

export default function Kravtabell({ krav }: KravtabellProps) {
    const navigate = KravdetaljerRoute.useNavigate();

    const handleRowClick = (id: string, type: string) => {
        navigate({
            params: { kravId: id },
            search: { type: type as "SKATTEETATEN" | "NAV" },
        }).catch((error) => {
            console.error("Navigation failed:", error);
        });
    };

    const handleKeyDown = (
        e: React.KeyboardEvent,
        id: string,
        type: string,
    ) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleRowClick(id, type);
        }
    };

    return (
        <Table>
            <Table.Header>
                <Table.Row>
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
                        <Table.Row
                            key={rowKey}
                            className="cursor-pointer"
                            tabIndex={0}
                            role="button"
                            onClick={() => handleRowClick(id, type)}
                            onKeyDown={(e) => handleKeyDown(e, id, type)}
                            aria-label={`Vis detaljer for krav ${id ?? "uten identifikator"} av type ${type}`}
                        >
                            <Table.HeaderCell scope="row">
                                {id ?? "Mangler kravidentifikator"}
                            </Table.HeaderCell>
                            <Table.DataCell>{type}</Table.DataCell>
                            <Table.DataCell>{kravtype}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}
