import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
    Alert,
    BoxNew,
    Heading,
    HGrid,
    Loader,
    Radio,
    RadioGroup,
    Search,
    VStack,
} from "@navikt/ds-react";
import { Kravoversikt as KravoversiktType } from "../server/hentKravoversikt";
import Kravtabell from "../components/Kravtabell";
import SkyldnerInfo from "../components/SkyldnerInfo";
import { Søk } from "../types/skyldner";
import { Route as KravdetaljerRoute } from "./kravoversikt/kravdetaljer/$kravId";
import useKravoversikt from "../queries/useKravoversikt";

export const Route = createFileRoute("/kravoversikt")({
    component: Kravoversikt,
});

function Kravoversikt() {
    const kravoversikt = useKravoversikt();

    const kravdetaljerNavigate = KravdetaljerRoute.useNavigate();

    const søketekstName = "søketekst";
    const søketypeName = "søketype";
    const kravfilterName = "kravfilter";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const søk = {
            søketekst: formData.get(søketekstName),
            søketype: formData.get(søketypeName),
            kravfilter: formData.get(kravfilterName),
        } as Søk;

        // Om brukeren søker på skyldner, vises en tabell med krav
        if (søk.søketype === "SKYLDNER") {
            kravoversikt.mutate(søk);
            // Om brukeren søker på kravidentifikator, navigeres direkte til kravdetaljer
        } else {
            // Reset mutation data to clear the krav list
            kravoversikt.reset();
            await kravdetaljerNavigate({
                search: { type: søk.søketype },
                params: { kravId: søk.søketekst },
            });
        }
    };

    return (
        <HGrid gap="6" columns="1fr 3fr">
            <div className="top-0 sticky max-h-screen self-start overflow-y-auto">
                <VStack gap="6">
                    <BoxNew
                        padding="space-16"
                        borderColor="accent-subtle"
                        borderWidth="1"
                        borderRadius="large"
                    >
                        <form role="search" onSubmit={handleSubmit}>
                            <VStack gap="4">
                                <Search
                                    name={søketekstName}
                                    label={
                                        <Heading level="2" size="medium">
                                            Søk etter innkrevingskrav
                                        </Heading>
                                    }
                                    hideLabel={false}
                                    disabled={kravoversikt.isPending}
                                />
                                <RadioGroup
                                    name={søketypeName}
                                    legend="Velg søketype"
                                    defaultValue="SKYLDNER"
                                >
                                    <Radio value="SKYLDNER">
                                        Skyldner (fnr/orgnr)
                                    </Radio>
                                    <Radio value="NAV">
                                        Nav-kravidentifikator
                                    </Radio>
                                    <Radio value="SKATTEETATEN">
                                        Skatteetaten-kravidentifikator
                                    </Radio>
                                </RadioGroup>
                                <RadioGroup
                                    name={kravfilterName}
                                    legend="Velg kravfilter"
                                    defaultValue="ALLE"
                                >
                                    <Radio value="ALLE">Alle</Radio>
                                    <Radio value="ÅPNE">Åpne</Radio>
                                    <Radio value="LUKKEDE">Lukkede</Radio>
                                    <Radio value="INGEN">Ingen</Radio>
                                </RadioGroup>
                            </VStack>
                        </form>
                    </BoxNew>
                    {(kravoversikt.data ||
                        kravoversikt.isPending ||
                        kravoversikt.error) && (
                        <BoxNew
                            padding="space-16"
                            borderColor="accent-subtle"
                            borderWidth="1"
                            borderRadius="large"
                        >
                            {kravoversikt.data && (
                                <ConditionalKravtabell
                                    kravoversikt={kravoversikt.data}
                                />
                            )}
                            {kravoversikt.isPending && (
                                <Loader size="2xlarge" />
                            )}
                            {kravoversikt.error && (
                                <Alert variant="error">
                                    Feil ved søk:{" "}
                                    {kravoversikt.error.message}
                                </Alert>
                            )}
                        </BoxNew>
                    )}
                </VStack>
            </div>
            <Outlet />
        </HGrid>
    );
}

function ConditionalKravtabell({
    kravoversikt,
}: {
    kravoversikt: KravoversiktType;
}) {
    if (kravoversikt.krav.length === 0) {
        return <Alert variant="info">Fant ingen krav</Alert>;
    }

    return (
        <VStack gap="4">
            <SkyldnerInfo
                skyldner={kravoversikt.skyldner}
                gjenståendeBeløpForSkyldner={
                    kravoversikt.gjenståendeBeløpForSkyldner
                }
            />
            <div className="overflow-x-auto">
                <Kravtabell krav={kravoversikt.krav} />
            </div>
        </VStack>
    );
}
