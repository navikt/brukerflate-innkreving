import { BodyShort, Heading, HStack, VStack } from "@navikt/ds-react";
import {
    HentKravoversiktJsonResponse,
    HentKravoversiktJsonResponseSkyldner,
} from "../generated/model";

interface SkyldnerInfoProps {
    skyldner: HentKravoversiktJsonResponseSkyldner;
    gjenståendeBeløpForSkyldner: HentKravoversiktJsonResponse["gjenståendeBeløpForSkyldner"];
}

export default function SkyldnerInfo({
    skyldner,
    gjenståendeBeløpForSkyldner,
}: SkyldnerInfoProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("nb-NO", {
            style: "currency",
            currency: "NOK",
        }).format(amount);
    };

    return (
        <VStack gap="space-12">
            <Heading level="3" size="medium">
                Skyldnerinformasjon
            </Heading>
            <HStack gap="space-32" wrap={false}>
                <div>
                    <BodyShort size="small" className="text-ax-text-neutral-subtle">
                        Skyldner
                    </BodyShort>
                    <BodyShort>
                        {skyldner.skyldnersNavn || "Navn ikke tilgjengelig"}
                    </BodyShort>
                    <BodyShort size="small">{skyldner.identifikator}</BodyShort>
                </div>
                <div>
                    <BodyShort size="small" className="text-ax-text-neutral-subtle">
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
