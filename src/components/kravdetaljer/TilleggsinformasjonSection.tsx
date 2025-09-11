import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";

interface TilleggsinformasjonSectionProps {
    tilleggsinformasjon?: {
        tilleggsinformasjonNav?: {
            vedtaksId?: string;
            ytelsestype?: string;
        };
    };
}

export default function TilleggsinformasjonSection({ tilleggsinformasjon }: TilleggsinformasjonSectionProps) {
    if (!tilleggsinformasjon || !tilleggsinformasjon.tilleggsinformasjonNav) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Tilleggsinformasjon NAV
            </Heading>
            <Box
                padding="4"
                borderWidth="2"
                borderRadius="xlarge"
            >
                <VStack gap="1">
                    <Heading size="small" level="4">
                        Vedtaks-ID
                    </Heading>
                    <BodyShort>{tilleggsinformasjon.tilleggsinformasjonNav.vedtaksId}</BodyShort>

                    <Heading size="small" level="4">
                        Ytelsestype
                    </Heading>
                    <BodyShort>{tilleggsinformasjon.tilleggsinformasjonNav.ytelsestype}</BodyShort>
                </VStack>
            </Box>
        </>
    );
}