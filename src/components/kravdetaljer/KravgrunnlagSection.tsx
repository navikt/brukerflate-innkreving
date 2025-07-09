import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";

interface KravgrunnlagSectionProps {
    kravgrunnlag: {
        datoNårKravVarBesluttetHosOppdragsgiver: string;
        oppdragsgiversKravidentifikator?: string;
        oppdragsgiversSaksreferanse?: string;
    };
}

export default function KravgrunnlagSection({ kravgrunnlag }: KravgrunnlagSectionProps) {
    return (
        <>
            <Heading size="medium" level="3">
                Kravgrunnlag
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
                        Dato når krav var besluttet hos oppdragsgiver
                    </Heading>
                    <BodyShort>
                        {kravgrunnlag.datoNårKravVarBesluttetHosOppdragsgiver}
                    </BodyShort>

                    {kravgrunnlag.oppdragsgiversKravidentifikator && (
                        <>
                            <Heading size="small" level="4">
                                Oppdragsgivers kravidentifikator
                            </Heading>
                            <BodyShort>{kravgrunnlag.oppdragsgiversKravidentifikator}</BodyShort>
                        </>
                    )}

                    {kravgrunnlag.oppdragsgiversSaksreferanse && (
                        <>
                            <Heading size="small" level="4">
                                Oppdragsgivers saksreferanse
                            </Heading>
                            <BodyShort>{kravgrunnlag.oppdragsgiversSaksreferanse}</BodyShort>
                        </>
                    )}
                </VStack>
            </Box>
        </>
    );
}