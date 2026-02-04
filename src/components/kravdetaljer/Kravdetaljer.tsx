import { Heading, VStack } from "@navikt/ds-react";
import KravgrunnlagSection from "./KravgrunnlagSection";
import KravlinjerSection from "./KravlinjerSection";
import InnbetalingerSection from "./InnbetalingerSection";
import TilleggsinformasjonSection from "./TilleggsinformasjonSection";
import AvvikSection from "./AvvikSection";
import OppdragsgiverSection from "./OppdragsgiverSection";
import SkyldnerSection from "./SkyldnerSection";
import KravInfoSection from "./KravInfoSection";
import { HentKravdetaljerJsonResponse } from "../../generated/model";

interface KravdetaljerProps {
    kravdetaljer: HentKravdetaljerJsonResponse;
}

export default function Kravdetaljer({ kravdetaljer }: KravdetaljerProps) {
    return (
        <VStack gap="2">
            <Heading level="2" size="large">
                Krav
            </Heading>

            <SkyldnerSection
                skyldner={{
                    identifikator: kravdetaljer.skyldner.identifikator,
                    skyldnersNavn:
                        kravdetaljer.skyldner.skyldnersNavn ?? undefined,
                }}
            />
            <OppdragsgiverSection oppdragsgiver={kravdetaljer.oppdragsgiver} />
            <KravInfoSection krav={kravdetaljer.krav} />
            <KravgrunnlagSection
                kravgrunnlag={kravdetaljer.krav.kravgrunnlag}
            />
            <KravlinjerSection
                kravlinjer={kravdetaljer.krav.kravlinjer ?? []}
            />
            <AvvikSection avvik={kravdetaljer.avvik ?? undefined} />
            <InnbetalingerSection
                innbetalingerPlassertMotKrav={
                    kravdetaljer.krav.innbetalingerPlassertMotKrav ?? []
                }
            />
            <TilleggsinformasjonSection
                tilleggsinformasjon={
                    kravdetaljer.krav.tilleggsinformasjon ?? undefined
                }
            />
        </VStack>
    );
}
