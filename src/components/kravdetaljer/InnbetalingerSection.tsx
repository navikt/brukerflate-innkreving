import { BodyShort, BoxNew, Heading, VStack } from "@navikt/ds-react";

interface InnbetalingerSectionProps {
    innbetalingerPlassertMotKrav: Array<{
        innbetalingsIdentifikator: string;
        innbetalingstype: string;
        innbetalingsdato: string;
        innbetaltBeløp: number;
    }>;
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
                <BoxNew
                    key={index}
                    padding="4"
                    borderWidth="2"
                    borderRadius="xlarge"
                >
                    <VStack gap="1">
                        <Heading size="small" level="4">
                            Innbetalingsidentifikator
                        </Heading>
                        <BodyShort>{innbetaling.innbetalingsIdentifikator}</BodyShort>

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
                </BoxNew>
            ))}
        </>
    );
}
