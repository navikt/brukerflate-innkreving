import { BodyShort, BoxNew, Heading, VStack } from "@navikt/ds-react";
import { HentKravdetaljerJsonResponseAvvik } from "../../generated/model";

interface AvvikSectionProps {
    avvik?: HentKravdetaljerJsonResponseAvvik;
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
            <BoxNew padding="4" borderWidth="2" borderRadius="xlarge">
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
            </BoxNew>
        </>
    );
}
