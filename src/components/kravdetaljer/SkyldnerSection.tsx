import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";

interface SkyldnerSectionProps {
    skyldner?: {
        identifikator?: string;
        skyldnersNavn?: string;
    };
}

export default function SkyldnerSection({ skyldner }: SkyldnerSectionProps) {
    if (!skyldner) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Skyldner
            </Heading>
            <Box
                padding="4"
                borderWidth="2"
                borderRadius="xlarge"
            >
                <VStack gap="1">
                    <Heading size="small" level="4">
                        Navn
                    </Heading>
                    <BodyShort>{skyldner.skyldnersNavn}</BodyShort>

                    <Heading size="small" level="4">
                        Identifikator
                    </Heading>
                    <BodyShort>{skyldner.identifikator}</BodyShort>
                </VStack>
            </Box>
        </>
    );
}