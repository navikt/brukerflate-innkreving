import { Table } from "@navikt/ds-react";
import React from "react";
import { Route as KravdetaljerRoute } from "../routes/kravoversikt/kravdetaljer/$kravId";
import { HentKravoversiktJsonResponseKravItem } from "../generated/model";

interface KravtabellProps {
    krav: HentKravoversiktJsonResponseKravItem[];
}

export default function Kravtabell({ krav }: KravtabellProps) {
    const navigate = KravdetaljerRoute.useNavigate();

    const handleRowClick = (navId: string) => {
        // Use NAV identifier for navigation
        navigate({
            params: { kravId: navId },
            search: { type: "NAV" },
        }).catch((error) => {
            console.error("Navigation failed:", error);
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent, navId: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleRowClick(navId);
        }
    };

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">
                        NAV-kravidentifikator
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">Kravtype</Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">
                        Gjenstående beløp
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {krav.map((krav, i) => {
                    const { navKravidentifikator, kravtype, gjenståendeBeløp } =
                        krav;
                    const rowKey = `${navKravidentifikator}-${i}`;

                    return (
                        <Table.Row
                            key={rowKey}
                            className="cursor-pointer"
                            tabIndex={0}
                            role="button"
                            onClick={() => handleRowClick(navKravidentifikator)}
                            onKeyDown={(e) =>
                                handleKeyDown(e, navKravidentifikator)
                            }
                            aria-label={`Vis detaljer for krav ${navKravidentifikator}`}
                        >
                            <Table.HeaderCell scope="row">
                                {navKravidentifikator}
                            </Table.HeaderCell>
                            <Table.DataCell>{kravtype}</Table.DataCell>
                            <Table.DataCell align="right">
                                {new Intl.NumberFormat("nb-NO", {
                                    style: "currency",
                                    currency: "NOK",
                                }).format(gjenståendeBeløp)}
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}
