import {BodyShort, Box, DatePicker, Heading, HStack, useDatepicker, VStack} from "@navikt/ds-react";
import {Kravdetaljer as KravdetaljerProps} from "../server/hentKravdetaljer";
import oppdaterTilleggsfrist from "../server/oppdaterTilleggsfrist";

interface KravdetaljerComponentProps extends KravdetaljerProps {
    id: string;
    type: "SKATTEETATEN" | "NAV";
}

export default function Kravdetaljer(props: KravdetaljerComponentProps) {
    const {datepickerProps, inputProps} = useDatepicker({
        defaultSelected: props.tilleggsfrist ? new Date(props.tilleggsfrist) : undefined,
        onDateChange: (date) => {
            if (date) {
                oppdaterTilleggsfrist({
                    data: {
                        id: props.id,
                        type: props.type,
                        tilleggsfrist: date.toISOString().split('T')[0],
                    }
                });
            }
        },
    });

    return (
        <VStack gap="2">
            <Heading level="2" size="large">Krav</Heading>
            <Heading size="medium" level="3">Dato når krav var besluttet hos oppdragsgiver</Heading>
            <BodyShort>{props.kravgrunnlag.datoNårKravVarBesluttetHosOppdragsgiver}</BodyShort>
            <Heading size="medium" level="3">Tilleggsfrist</Heading>
            <HStack>
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input {...inputProps} label="Tilleggsfrist"/>
                </DatePicker>
            </HStack>
            <Heading size="medium" level="3">Kravlinjer</Heading>
            {props.kravlinjer.map((kravlinje) => {
                return (
                    <Box background="surface-subtle" borderColor="border-alt-3" padding="4" borderWidth="2"
                         borderRadius="xlarge">
                        <VStack gap="1">
                            <Heading size="small" level="4">Kravlinjetype</Heading>
                            <BodyShort>{kravlinje.kravlinjetype}</BodyShort>
                            <Heading size="small" level="4">Opprinnelig beløp</Heading>
                            <BodyShort>{kravlinje.opprinneligBeløp}</BodyShort>
                            <Heading size="small" level="4">Gjenstående beløp</Heading>
                            <BodyShort>{kravlinje.gjenståendeBeløp}</BodyShort>
                        </VStack>
                    </Box>
                )
            })}
        </VStack>
    )
}
