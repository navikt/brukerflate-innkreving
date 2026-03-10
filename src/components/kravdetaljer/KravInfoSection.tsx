import { Alert, BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { HentKravdetaljerJsonResponseKrav } from "../../generated/model";

interface KravInfoSectionProps {
    krav: HentKravdetaljerJsonResponseKrav;
}

export default function KravInfoSection({ krav }: KravInfoSectionProps) {
    return (
        <>
            <Heading size="medium" level="3">
                Kravinformasjon
            </Heading>
            <Box padding="space-16" borderWidth="2" borderRadius="12">
                <VStack gap="space-4">
                    <Heading size="small" level="4">
                        Kravtype
                    </Heading>
                    <BodyShort>{krav.kravtype}</BodyShort>

                    <Heading size="small" level="4">
                        Skatteetatens kravidentifikator
                    </Heading>
                    {krav.skatteetatensKravidentifikator ?
                        <BodyShort>
                            {krav.skatteetatensKravidentifikator}
                        </BodyShort>
                    :   <Alert variant="info">
                            Skatteetatens kravidentifikator mangler
                        </Alert>
                    }

                    <Heading size="small" level="4">
                        Opprinnelig beløp
                    </Heading>
                    <BodyShort>
                        {krav.opprinneligBeløp.toLocaleString("nb-NO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}{" "}
                        NOK
                    </BodyShort>

                    <Heading size="small" level="4">
                        Gjenstående beløp
                    </Heading>
                    <BodyShort>
                        {krav.gjenståendeBeløp.toLocaleString("nb-NO", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}{" "}
                        NOK
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
            </Box>
        </>
    );
}
