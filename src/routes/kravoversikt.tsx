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
import { useForm } from "@tanstack/react-form";
import Kravtabell from "../components/Kravtabell";
import SkyldnerInfo from "../components/SkyldnerInfo";
import { Søk } from "../types/skyldner";
import { Route as KravdetaljerRoute } from "./kravoversikt/kravdetaljer/$kravId";
import useKravoversikt from "../queries/useKravoversikt";
import { HentKravoversiktJsonResponse } from "../generated/model";

export const Route = createFileRoute("/kravoversikt")({
    component: Kravoversikt,
});

function Kravoversikt() {
    const kravoversikt = useKravoversikt();
    const kravdetaljerNavigate = KravdetaljerRoute.useNavigate();

    const form = useForm({
        defaultValues: {
            søketekst: "",
            søketype: "SKYLDNER",
            kravfilter: "ALLE",
        } as Søk,
        onSubmit: async ({ value }) => {
            // Om brukeren søker på skyldner, vises en tabell med krav
            if (value.søketype === "SKYLDNER") {
                kravoversikt.mutate({
                    data: { skyldner: value.søketekst, kravfilter: value.kravfilter },
                });
                // Om brukeren søker på kravidentifikator, navigeres direkte til kravdetaljer
            } else {
                // Reset mutation data to clear the krav list
                kravoversikt.reset();
                await kravdetaljerNavigate({
                    search: { type: value.søketype },
                    params: { kravId: value.søketekst },
                });
            }
        },
    });

    return (
        <HGrid gap="6" columns="1fr 3fr">
            <div className="sticky top-0 max-h-screen self-start overflow-y-auto">
                <VStack gap="6">
                    <BoxNew
                        padding="space-16"
                        borderColor="accent-subtle"
                        borderWidth="1"
                        borderRadius="large"
                    >
                        <form
                            role="search"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await form.handleSubmit();
                            }}
                        >
                            <VStack gap="4">
                                <form.Field name="søketekst">
                                    {(field) => (
                                        <Search
                                            value={field.state.value}
                                            onChange={field.handleChange}
                                            label={
                                                <Heading level="2" size="medium">
                                                    Søk etter innkrevingskrav
                                                </Heading>
                                            }
                                            hideLabel={false}
                                            disabled={kravoversikt.isPending}
                                        />
                                    )}
                                </form.Field>
                                <form.Field name="søketype">
                                    {(field) => (
                                        <RadioGroup
                                            value={field.state.value}
                                            onChange={field.handleChange}
                                            legend="Velg søketype"
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
                                    )}
                                </form.Field>
                                <form.Field name="kravfilter">
                                    {(field) => (
                                        <RadioGroup
                                            value={field.state.value}
                                            onChange={field.handleChange}
                                            legend="Velg kravfilter"
                                        >
                                            <Radio value="ALLE">Alle</Radio>
                                            <Radio value="ÅPNE">Åpne</Radio>
                                            <Radio value="LUKKEDE">Lukkede</Radio>
                                            <Radio value="INGEN">Ingen</Radio>
                                        </RadioGroup>
                                    )}
                                </form.Field>
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
                                    Feil ved søk: {kravoversikt.error.message}
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
    kravoversikt: HentKravoversiktJsonResponse;
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
