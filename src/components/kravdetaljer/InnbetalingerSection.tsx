import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { HentKravdetaljerJsonResponseKravInnbetalingerPlassertMotKravItem } from "../../generated/model";

interface InnbetalingerSectionProps {
    innbetalingerPlassertMotKrav: HentKravdetaljerJsonResponseKravInnbetalingerPlassertMotKravItem[];
}

export default function InnbetalingerSection({
    innbetalingerPlassertMotKrav,
}: InnbetalingerSectionProps) {
    if (
        !innbetalingerPlassertMotKrav ||
        innbetalingerPlassertMotKrav.length === 0
    ) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Innbetalinger
            </Heading>
            {innbetalingerPlassertMotKrav.map((innbetaling, index) => (
                <Box
                    key={index}
                    padding="space-16"
                    borderWidth="2"
                    borderRadius="12"
                >
                    <VStack gap="space-4">
                        <Heading size="small" level="4">
                            Innbetalingsidentifikator
                        </Heading>
                        <BodyShort>
                            {innbetaling.innbetalingsIdentifikator}
                        </BodyShort>

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
                        <BodyShort>
                            {innbetaling.innbetaltBeløp.toLocaleString(
                                "nb-NO",
                                { minimumFractionDigits: 2 },
                            )}{" "}
                            kr
                        </BodyShort>
                    </VStack>
                </Box>
            ))}
        </>
    );
}
