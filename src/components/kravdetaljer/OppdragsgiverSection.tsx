import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { HentKravdetaljerJsonResponseOppdragsgiver } from "../../generated/model";

interface OppdragsgiverSectionProps {
    oppdragsgiver?: HentKravdetaljerJsonResponseOppdragsgiver;
}

export default function OppdragsgiverSection({
    oppdragsgiver,
}: OppdragsgiverSectionProps) {
    if (!oppdragsgiver) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Oppdragsgiver
            </Heading>
            <Box padding="space-16" borderWidth="2" borderRadius="12">
                <VStack gap="space-4">
                    <Heading size="small" level="4">
                        Organisasjonsnavn
                    </Heading>
                    <BodyShort>{oppdragsgiver.organisasjonsnavn}</BodyShort>

                    <Heading size="small" level="4">
                        Organisasjonsnummer
                    </Heading>
                    <BodyShort>{oppdragsgiver.organisasjonsnummer}</BodyShort>
                </VStack>
            </Box>
        </>
    );
}
