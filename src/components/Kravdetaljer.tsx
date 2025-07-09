import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { Kravdetaljer as KravdetaljerResponse } from "../server/hentKravdetaljer";

interface KravdetaljerProps extends KravdetaljerResponse {
    id: string;
    type: "SKATTEETATEN" | "NAV";
}

export default function Kravdetaljer(props: KravdetaljerProps) {
    return (
        <VStack gap="2">
            <Heading level="2" size="large">
                Krav
            </Heading>

            {/* Kravgrunnlag section */}
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
                        {props.kravgrunnlag.datoNårKravVarBesluttetHosOppdragsgiver}
                    </BodyShort>

                    {props.kravgrunnlag.oppdragsgiversKravidentifikator && (
                        <>
                            <Heading size="small" level="4">
                                Oppdragsgivers kravidentifikator
                            </Heading>
                            <BodyShort>{props.kravgrunnlag.oppdragsgiversKravidentifikator}</BodyShort>
                        </>
                    )}

                    {props.kravgrunnlag.oppdragsgiversSaksreferanse && (
                        <>
                            <Heading size="small" level="4">
                                Oppdragsgivers saksreferanse
                            </Heading>
                            <BodyShort>{props.kravgrunnlag.oppdragsgiversSaksreferanse}</BodyShort>
                        </>
                    )}
                </VStack>
            </Box>

            {/* Kravlinjer section */}
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
                            <BodyShort>{kravlinje.opprinneligBeløp.toLocaleString('nb-NO', { minimumFractionDigits: 2 })} kr</BodyShort>

                            <Heading size="small" level="4">
                                Gjenstående beløp
                            </Heading>
                            <BodyShort>{kravlinje.gjenståendeBeløp.toLocaleString('nb-NO', { minimumFractionDigits: 2 })} kr</BodyShort>

                            {kravlinje.kravlinjeBeskrivelse && (
                                <>
                                    <Heading size="small" level="4">
                                        Beskrivelse
                                    </Heading>
                                    {kravlinje.kravlinjeBeskrivelse.spraakTekst?.map((tekst, i) => (
                                        <BodyShort key={i}>{tekst.tekst}</BodyShort>
                                    ))}
                                </>
                            )}
                        </VStack>
                    </Box>
                );
            })}

            {/* Innbetalinger section */}
            {props.innbetalingPlassertMotKrav && props.innbetalingPlassertMotKrav.length > 0 && (
                <>
                    <Heading size="medium" level="3">
                        Innbetalinger
                    </Heading>
                    {props.innbetalingPlassertMotKrav.map((innbetaling, index) => (
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
                                    Innbetalingstype
                                </Heading>
                                <BodyShort>{innbetaling.innbetalingstype}</BodyShort>

                                <Heading size="small" level="4">
                                    Innbetalingsdato
                                </Heading>
                                <BodyShort>{innbetaling.innbetalingsdato}</BodyShort>

                                <Heading size="small" level="4">
                                    Innbetalt beløp
                                </Heading>
                                <BodyShort>{innbetaling.innbetaltBeloep?.toLocaleString('nb-NO', { minimumFractionDigits: 2 }) ?? '-'} kr</BodyShort>

                                <Heading size="small" level="4">
                                    Innbetalings-ID
                                </Heading>
                                <BodyShort>{innbetaling.innbetalingsIdentifikator}</BodyShort>
                            </VStack>
                        </Box>
                    ))}
                </>
            )}

            {/* Tilleggsinformasjon section */}
            {props.tilleggsinformasjon && props.tilleggsinformasjon.tilleggsinformasjonNav && (
                <>
                    <Heading size="medium" level="3">
                        Tilleggsinformasjon NAV
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
                                Vedtaks-ID
                            </Heading>
                            <BodyShort>{props.tilleggsinformasjon.tilleggsinformasjonNav.vedtaksId}</BodyShort>

                            <Heading size="small" level="4">
                                Ytelsestype
                            </Heading>
                            <BodyShort>{props.tilleggsinformasjon.tilleggsinformasjonNav.ytelsestype}</BodyShort>
                        </VStack>
                    </Box>
                </>
            )}

            {/* Avvik section */}
            {props.avvik && (
                <>
                    <Heading size="medium" level="3">
                        Avvik
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
                                Avvikstype
                            </Heading>
                            <BodyShort>{props.avvik.avvikstype}</BodyShort>

                            <Heading size="small" level="4">
                                Utdypende avviksbeskrivelse
                            </Heading>
                            <BodyShort>{props.avvik.utdypendeAvviksbeskrivelse}</BodyShort>
                        </VStack>
                    </Box>
                </>
            )}

            {/* Oppdragsgiver section */}
            {props.oppdragsgiver && (
                <>
                    <Heading size="medium" level="3">
                        Oppdragsgiver
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
                                Organisasjonsnavn
                            </Heading>
                            <BodyShort>{props.oppdragsgiver.organisasjonsnavn}</BodyShort>

                            <Heading size="small" level="4">
                                Organisasjonsnummer
                            </Heading>
                            <BodyShort>{props.oppdragsgiver.organisasjonsnummer}</BodyShort>
                        </VStack>
                    </Box>
                </>
            )}

            {/* Skyldner section */}
            {props.skyldner && (
                <>
                    <Heading size="medium" level="3">
                        Skyldner
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
                                Navn
                            </Heading>
                            <BodyShort>{props.skyldner.skyldnersNavn}</BodyShort>

                            <Heading size="small" level="4">
                                Identifikator
                            </Heading>
                            <BodyShort>{props.skyldner.identifikator}</BodyShort>
                        </VStack>
                    </Box>
                </>
            )}
        </VStack>
    );
}
