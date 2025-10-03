import { BodyShort, BoxNew, Heading, VStack } from "@navikt/ds-react";

interface KravInfoSectionProps {
    krav: {
        forfallsdato: string;
        foreldelsesdato: string;
        fastsettelsesdato: string;
        kravtype: string;
        opprinneligBeløp: number;
        gjenståendeBeløp: number;
        skatteetatensKravidentifikator: string;
    };
}

export default function KravInfoSection({ krav }: KravInfoSectionProps) {
    return (
        <>
            <Heading size="medium" level="3">
                Kravinformasjon
            </Heading>
            <BoxNew padding="4" borderWidth="2" borderRadius="xlarge">
                <VStack gap="1">
                    <Heading size="small" level="4">
                        Kravtype
                    </Heading>
                    <BodyShort>{krav.kravtype}</BodyShort>

                    <Heading size="small" level="4">
                        Skatteetatens kravidentifikator
                    </Heading>
                    <BodyShort>{krav.skatteetatensKravidentifikator}</BodyShort>

                    <Heading size="small" level="4">
                        Opprinnelig beløp
                    </Heading>
                    <BodyShort>
                        {krav.opprinneligBeløp.toLocaleString("nb-NO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })} NOK
                    </BodyShort>

                    <Heading size="small" level="4">
                        Gjenstående beløp
                    </Heading>
                    <BodyShort>
                        {krav.gjenståendeBeløp.toLocaleString("nb-NO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })} NOK
                    </BodyShort>

                    <Heading size="small" level="4">
                        Forfallsdato
                    </Heading>
                    <BodyShort>{krav.forfallsdato}</BodyShort>

                    <Heading size="small" level="4">
                        Foreldelsesdato
                    </Heading>
                    <BodyShort>{krav.foreldelsesdato}</BodyShort>

                    <Heading size="small" level="4">
                        Fastsettelsesdato
                    </Heading>
                    <BodyShort>{krav.fastsettelsesdato}</BodyShort>
                </VStack>
            </BoxNew>
        </>
    );
}

