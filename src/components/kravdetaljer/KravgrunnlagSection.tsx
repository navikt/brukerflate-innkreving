import { BodyShort, BoxNew, Heading, VStack } from "@navikt/ds-react";
import { Kravgrunnlag } from "../../server/hentKravdetaljer";

export default function KravgrunnlagSection(kravgrunnlag: Kravgrunnlag) {
    return (
        <>
            <Heading size="medium" level="3">
                Kravgrunnlag
            </Heading>
            <BoxNew padding="4" borderWidth="2" borderRadius="xlarge">
                <VStack gap="1">
                    <Heading size="small" level="4">
                        Oppdragsgivers kravidentifikator
                    </Heading>
                    <BodyShort>
                        {kravgrunnlag.oppdragsgiversKravidentifikator}
                    </BodyShort>

                    <Heading size="small" level="4">
                        Oppdragsgivers referanse
                    </Heading>
                    <BodyShort>
                        {kravgrunnlag.oppdragsgiversReferanse}
                    </BodyShort>
                </VStack>
            </BoxNew>
        </>
    );
}
