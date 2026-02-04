import { BodyShort, BoxNew, Heading, VStack } from "@navikt/ds-react";
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
            <BoxNew padding="4" borderWidth="2" borderRadius="xlarge">
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
            </BoxNew>
        </>
    );
}
