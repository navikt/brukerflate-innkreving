import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";

interface KravlinjerSectionProps {
    kravlinjer: Array<{
        kravlinjetype: string;
        opprinneligBeløp: number;
        gjenståendeBeløp: number;
        kravlinjeBeskrivelse?: {
            spraakTekst?: Array<{
                spraak?: string;
                tekst?: string;
            }>;
        };
    }>;
}

export default function KravlinjerSection({ kravlinjer }: KravlinjerSectionProps) {
    return (
        <>
            <Heading size="medium" level="3">
                Kravlinjer
            </Heading>
            {kravlinjer.map((kravlinje, index) => {
                return (
                    <Box
                        key={index}
                        background="surface-subtle"
                        borderColor="border-alt-3"
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
                            <BodyShort>{kravlinje.opprinneligBeløp.toLocaleString('nb-NO', { minimumFractionDigits: 2 })} kr</BodyShort>

                            <Heading size="small" level="4">
                                Gjenstående beløp
                            </Heading>
                            <BodyShort>{kravlinje.gjenståendeBeløp.toLocaleString('nb-NO', { minimumFractionDigits: 2 })} kr</BodyShort>

                            {kravlinje.kravlinjeBeskrivelse && (
                                <>
                                    <Heading size="small" level="4">
                                        Beskrivelse
                                    </Heading>
                                    {kravlinje.kravlinjeBeskrivelse.spraakTekst?.map((tekst, i) => (
                                        <BodyShort key={i}>{tekst.tekst}</BodyShort>
                                    ))}
                                </>
                            )}
                        </VStack>
                    </Box>
                );
            })}
        </>
    );
}