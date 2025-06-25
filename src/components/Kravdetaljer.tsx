import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { Kravdetaljer } from "../server/hentKravdetaljer";

interface KravdetaljerProps extends Kravdetaljer {
    id: string;
    type: "SKATTEETATEN" | "NAV";
}

export default function Kravdetaljer(props: KravdetaljerProps) {
    return (
        <VStack gap="2">
            <Heading level="2" size="large">
                Krav
            </Heading>
            <Heading size="medium" level="3">
                Dato når krav var besluttet hos oppdragsgiver
            </Heading>
            <BodyShort>
                {props.kravgrunnlag.datoNårKravVarBesluttetHosOppdragsgiver}
            </BodyShort>
            <Heading size="medium" level="3">
                Kravlinjer
            </Heading>
            {props.kravlinjer.map((kravlinje, index) => {
                return (
                    <Box
                        key={index}
                        background="surface-subtle"
                        borderColor="border-alt-3"
                        padding="4"
                        borderWidth="2"
                        borderRadius="xlarge"
                    >
                        <VStack gap="1">
                            <Heading size="small" level="4">
                                Kravlinjetype
                            </Heading>
                            <BodyShort>{kravlinje.kravlinjetype}</BodyShort>
                            <Heading size="small" level="4">
                                Opprinnelig beløp
                            </Heading>
                            <BodyShort>{kravlinje.opprinneligBeløp}</BodyShort>
                            <Heading size="small" level="4">
                                Gjenstående beløp
                            </Heading>
                            <BodyShort>{kravlinje.gjenståendeBeløp}</BodyShort>
                        </VStack>
                    </Box>
                );
            })}
        </VStack>
    );
}
