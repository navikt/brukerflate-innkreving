import { Heading, VStack } from "@navikt/ds-react";
import { Kravdetaljer as KravdetaljerResponse } from "../../server/hentKravdetaljer";
import KravgrunnlagSection from "./KravgrunnlagSection";
import KravlinjerSection from "./KravlinjerSection";
import InnbetalingerSection from "./InnbetalingerSection";
import TilleggsinformasjonSection from "./TilleggsinformasjonSection";
import AvvikSection from "./AvvikSection";
import OppdragsgiverSection from "./OppdragsgiverSection";
import SkyldnerSection from "./SkyldnerSection";
import KravInfoSection from "./KravInfoSection";

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

            <SkyldnerSection
                skyldner={{
                    identifikator: props.skyldner.identifikator,
                    skyldnersNavn: props.skyldner.skyldnersNavn ?? undefined,
                }}
            />
            <OppdragsgiverSection oppdragsgiver={props.oppdragsgiver} />
            <KravInfoSection krav={props.krav} />
            <KravgrunnlagSection kravgrunnlag={props.krav.kravgrunnlag} />
            <KravlinjerSection kravlinjer={props.krav.kravlinjer} />
            <AvvikSection avvik={props.avvik ?? undefined} />
            <InnbetalingerSection
                innbetalingerPlassertMotKrav={props.krav.innbetalingerPlassertMotKrav}
            />
            <TilleggsinformasjonSection
                tilleggsinformasjon={props.krav.tilleggsinformasjon ?? undefined}
            />
        </VStack>
    );
}
