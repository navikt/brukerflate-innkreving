import { Heading, VStack } from "@navikt/ds-react";
import { Kravdetaljer as KravdetaljerResponse } from "../../server/hentKravdetaljer";
import KravgrunnlagSection from "./KravgrunnlagSection";
import KravlinjerSection from "./KravlinjerSection";
import InnbetalingerSection from "./InnbetalingerSection";
import TilleggsinformasjonSection from "./TilleggsinformasjonSection";
import AvvikSection from "./AvvikSection";
import OppdragsgiverSection from "./OppdragsgiverSection";
import SkyldnerSection from "./SkyldnerSection";

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

            <SkyldnerSection skyldner={props.skyldner} />
            <OppdragsgiverSection oppdragsgiver={props.oppdragsgiver} />
            <KravgrunnlagSection kravgrunnlag={props.kravgrunnlag} />
            <KravlinjerSection kravlinjer={props.kravlinjer} />
            <AvvikSection avvik={props.avvik} />
            <InnbetalingerSection
                innbetalingPlassertMotKrav={props.innbetalingPlassertMotKrav}
            />
            <TilleggsinformasjonSection
                tilleggsinformasjon={props.tilleggsinformasjon}
            />
        </VStack>
    );
}
