import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";

interface OppdragsgiverSectionProps {
    oppdragsgiver?: {
        organisasjonsnummer?: string;
        organisasjonsnavn?: string;
    };
}

export default function OppdragsgiverSection({ oppdragsgiver }: OppdragsgiverSectionProps) {
    if (!oppdragsgiver) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Oppdragsgiver
            </Heading>
            <Box
                background="surface-subtle"
                borderColor="border-alt-3"
                padding="4"
                borderWidth="2"
                borderRadius="xlarge"
            >
                <VStack gap="1">
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