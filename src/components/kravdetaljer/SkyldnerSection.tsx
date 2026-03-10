import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { HentKravdetaljerJsonResponseSkyldner } from "../../generated/model";

interface SkyldnerSectionProps {
    skyldner?: HentKravdetaljerJsonResponseSkyldner
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
            <Box padding="space-16" borderWidth="2" borderRadius="12">
                <VStack gap="space-4">
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
