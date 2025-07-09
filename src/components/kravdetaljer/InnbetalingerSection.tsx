import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";

interface InnbetalingerSectionProps {
    innbetalingPlassertMotKrav?: Array<{
        innbetalingsIdentifikator?: string;
        innbetalingstype?: string;
        innbetalingsdato?: string;
        innbetaltBeloep?: number;
    }>;
}

export default function InnbetalingerSection({ innbetalingPlassertMotKrav }: InnbetalingerSectionProps) {
    if (!innbetalingPlassertMotKrav || innbetalingPlassertMotKrav.length === 0) {
        return null;
    }

    return (
        <>
            <Heading size="medium" level="3">
                Innbetalinger
            </Heading>
            {innbetalingPlassertMotKrav.map((innbetaling, index) => (
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
    );
}