import { BodyShort, BoxNew, Heading, VStack } from "@navikt/ds-react";

interface KravlinjerSectionProps {
    kravlinjer: Array<{
        kravlinjetype: string;
        opprinneligBeløp: number;
        gjenståendeBeløp: number;
        kravlinjeBeskrivelse: Record<string, string>;
    }>;
}

export default function KravlinjerSection({
    kravlinjer,
}: KravlinjerSectionProps) {
    return (
        <>
            <Heading size="medium" level="3">
                Kravlinjer
            </Heading>
            {kravlinjer.map((kravlinje, index) => {
                return (
                    <BoxNew
                        key={index}
                        padding="4"
                        borderWidth="2"
                        borderRadius="xlarge"
                    >
                        <VStack gap="1">
                            <Heading size="small" level="4">
                                Kravlinjetype
                            </Heading>
                            <BodyShort>{kravlinje.kravlinjetype}</BodyShort>

                            <Heading size="small" level="4">
                                Opprinnelig beløp
                            </Heading>
                            <BodyShort>
                                {kravlinje.opprinneligBeløp.toLocaleString(
                                    "nb-NO",
                                    { minimumFractionDigits: 2 },
                                )}{" "}
                                kr
                            </BodyShort>

                            <Heading size="small" level="4">
                                Gjenstående beløp
                            </Heading>
                            <BodyShort>
                                {kravlinje.gjenståendeBeløp.toLocaleString(
                                    "nb-NO",
                                    { minimumFractionDigits: 2 },
                                )}{" "}
                                kr
                            </BodyShort>

                            <Heading size="small" level="4">
                                Beskrivelse
                            </Heading>
                            <BodyShort>
                                {kravlinje.kravlinjeBeskrivelse["nb"] ||
                                    kravlinje.kravlinjeBeskrivelse["en"] ||
                                    "Ingen beskrivelse tilgjengelig"}
                            </BodyShort>
                        </VStack>
                    </BoxNew>
                );
            })}
        </>
    );
}
