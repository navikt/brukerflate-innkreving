import { BodyShort, Heading, HStack, VStack } from "@navikt/ds-react";
import { Kravoversikt } from "../server/hentKravoversikt";

interface SkyldnerInfoProps {
    skyldner: Kravoversikt["skyldner"];
    gjenståendeBeløpForSkyldner: Kravoversikt["gjenståendeBeløpForSkyldner"];
}

export default function SkyldnerInfo({ skyldner, gjenståendeBeløpForSkyldner }: SkyldnerInfoProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('nb-NO', {
            style: 'currency',
            currency: 'NOK',
        }).format(amount);
    };

    return (
        <VStack gap="3">
            <Heading level="3" size="medium">
                Skyldnerinformasjon
            </Heading>
            <HStack gap="8" wrap={false}>
                <div>
                    <BodyShort size="small" className="text-text-subtle">
                        Skyldner
                    </BodyShort>
                    <BodyShort>
                        {skyldner.skyldnersNavn || "Navn ikke tilgjengelig"}
                    </BodyShort>
                    <BodyShort size="small">
                        {skyldner.identifikator}
                    </BodyShort>
                </div>
                <div>
                    <BodyShort size="small" className="text-text-subtle">
                        Totalt gjenstående beløp
                    </BodyShort>
                    <BodyShort weight="semibold">
                        {formatCurrency(gjenståendeBeløpForSkyldner)}
                    </BodyShort>
                </div>
            </HStack>
        </VStack>
    );
}