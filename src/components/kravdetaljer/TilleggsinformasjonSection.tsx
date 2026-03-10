import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { HentKravdetaljerJsonResponseKravTilleggsinformasjon } from "../../generated/model";

interface TilleggsinformasjonSectionProps {
    tilleggsinformasjon?: HentKravdetaljerJsonResponseKravTilleggsinformasjon;
}

export default function TilleggsinformasjonSection({
    tilleggsinformasjon,
}: TilleggsinformasjonSectionProps) {
    if (!tilleggsinformasjon) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Tilleggsinformasjon {tilleggsinformasjon.type}
            </Heading>
            <Box padding="space-16" borderWidth="2" borderRadius="12">
                <VStack gap="space-4">
                    {tilleggsinformasjon.type === "Nav" && (
                        <>
                            {tilleggsinformasjon.ytelserForAvregning && (
                                <>
                                    <Heading size="small" level="4">
                                        Ytelser for avregning
                                    </Heading>
                                    <BodyShort>
                                        {tilleggsinformasjon.ytelserForAvregning.beløp.toLocaleString("nb-NO", {
                                            minimumFractionDigits: 2,
                                        })}{" "}
                                        {tilleggsinformasjon.ytelserForAvregning.valuta}
                                    </BodyShort>
                                </>
                            )}
                            {tilleggsinformasjon.tilbakekrevingsperiode && (
                                <>
                                    <Heading size="small" level="4">
                                        Tilbakekrevingsperiode
                                    </Heading>
                                    <BodyShort>
                                        {tilleggsinformasjon.tilbakekrevingsperiode.fom} til {tilleggsinformasjon.tilbakekrevingsperiode.tom}
                                    </BodyShort>
                                </>
                            )}
                        </>
                    )}
                    {tilleggsinformasjon.type === "BrønnøysundRegistrene" && (
                        <>
                            {tilleggsinformasjon.periode && (
                                <>
                                    <Heading size="small" level="4">
                                        Periode med tvangsmulkt
                                    </Heading>
                                    <BodyShort>
                                        {tilleggsinformasjon.periode.fom} til {tilleggsinformasjon.periode.tom}
                                    </BodyShort>
                                </>
                            )}
                            {tilleggsinformasjon.stoppdatoForLøpendeMulkt && (
                                <>
                                    <Heading size="small" level="4">
                                        Stoppdato for løpende mulkt
                                    </Heading>
                                    <BodyShort>
                                        {tilleggsinformasjon.stoppdatoForLøpendeMulkt}
                                    </BodyShort>
                                </>
                            )}
                        </>
                    )}
                </VStack>
            </Box>
        </>
    );
}
