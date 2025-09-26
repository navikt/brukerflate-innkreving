import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
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
import { hentKravoversikt, Krav } from "../server/hentKravoversikt";
import Kravtabell from "../components/Kravtabell";
import { Søk } from "../types/skyldner";
import { Route as KravdetaljerRoute } from "./kravoversikt/kravdetaljer/$kravId";

export const Route = createFileRoute("/kravoversikt")({
    component: Kravoversikt,
});

function Kravoversikt() {
    const kravoversiktMutation = useMutation({
        mutationFn: (søk: Søk) => hentKravoversikt({ data: søk }),
    });

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
            kravoversiktMutation.mutate(søk);
            // Om brukeren søker på kravidentifikator, navigeres direkte til kravdetaljer
        } else {
            kravdetaljerNavigate({
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
                                    disabled={kravoversiktMutation.isPending}
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
                    {(kravoversiktMutation.data ||
                        kravoversiktMutation.isPending ||
                        kravoversiktMutation.error) && (
                        <BoxNew
                            padding="space-16"
                            borderColor="accent-subtle"
                            borderWidth="1"
                            borderRadius="large"
                        >
                            {kravoversiktMutation.data && (
                                <ConditionalKravtabell
                                    krav={kravoversiktMutation.data.krav}
                                />
                            )}
                            {kravoversiktMutation.isPending && (
                                <Loader size="2xlarge" />
                            )}
                            {kravoversiktMutation.error && (
                                <Alert variant="error">
                                    Feil ved søk:{" "}
                                    {kravoversiktMutation.error.message}
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

function ConditionalKravtabell({ krav }: { krav: Krav[] }) {
    if (krav.length === 0) {
        return <Alert variant="info">Fant ingen krav</Alert>;
    }

    return (
        <div className="overflow-x-auto">
            <Kravtabell krav={krav} />
        </div>
    );
}
