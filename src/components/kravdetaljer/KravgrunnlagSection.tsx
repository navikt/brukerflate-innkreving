import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { HentKravdetaljerJsonResponseKravKravgrunnlag } from "../../generated/model";

interface KravgrunnlagSectionProps {
    kravgrunnlag: HentKravdetaljerJsonResponseKravKravgrunnlag;
}

export default function KravgrunnlagSection({
    kravgrunnlag,
}: KravgrunnlagSectionProps) {
    return (
        <>
            <Heading size="medium" level="3">
                Kravgrunnlag
            </Heading>
            <Box padding="space-16" borderWidth="2" borderRadius="12">
                <VStack gap="space-4">
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
            </Box>
        </>
    );
}
