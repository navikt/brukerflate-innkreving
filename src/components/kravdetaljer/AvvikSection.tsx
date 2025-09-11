import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";

interface AvvikSectionProps {
    avvik?: {
        avvikstype?: string;
        utdypendeAvviksbeskrivelse?: string;
    };
}

export default function AvvikSection({ avvik }: AvvikSectionProps) {
    if (!avvik) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Avvik
            </Heading>
            <Box
                padding="4"
                borderWidth="2"
                borderRadius="xlarge"
            >
                <VStack gap="1">
                    <Heading size="small" level="4">
                        Avvikstype
                    </Heading>
                    <BodyShort>{avvik.avvikstype}</BodyShort>

                    <Heading size="small" level="4">
                        Utdypende avviksbeskrivelse
                    </Heading>
                    <BodyShort>{avvik.utdypendeAvviksbeskrivelse}</BodyShort>
                </VStack>
            </Box>
        </>
    );
}