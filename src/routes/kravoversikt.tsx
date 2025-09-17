import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    Alert,
    Heading,
    HGrid,
    Radio,
    RadioGroup,
    Search,
    VStack,
} from "@navikt/ds-react";
import { hentKravoversikt } from "../server/hentKravoversikt";
import Kravtabell from "../components/Kravtabell";
import { useSearchState } from "../hooks/useSearchState";
import { type Kravfilter, type Skyldnertype } from "../types/skyldner";

export const Route = createFileRoute("/kravoversikt")({
    component: Kravoversikt,
});

function Kravoversikt() {
    const { searchState, updateSearchState, clearSearchState } =
        useSearchState();

    // Form state to prevent re-renders during typing/selection
    const [skyldner, setSkyldner] = useState(searchState.skyldner);
    const [skyldnertype, setSkyldnertype] = useState(searchState.type);
    const [kravfilter, setKravfilter] = useState(searchState.kravfilter);

    // Sync form state when searchState changes (from sessionStorage)
    useEffect(() => {
        setSkyldner(searchState.skyldner);
        setSkyldnertype(searchState.type);
        setKravfilter(searchState.kravfilter);
    }, [searchState.skyldner, searchState.type, searchState.kravfilter]);

    const kravoversiktQuery = useQuery({
        queryKey: ["kravoversikt", searchState],
        queryFn: () => hentKravoversikt({ data: searchState }),
        enabled: !!searchState.skyldner?.trim(),
        staleTime: 5 * 60 * 1000,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (skyldner.trim()) {
            updateSearchState({
                skyldner: skyldner.trim(),
                type: skyldnertype,
                kravfilter,
            });
        }
    };

    const handleClear = () => {
        setSkyldner("");
        setSkyldnertype("fødselsnummer");
        setKravfilter("ALLE");
        clearSearchState();
    };

    return (
        <HGrid gap="6" columns="1fr 3fr">
            <div>
                <form role="search" onSubmit={handleSubmit}>
                    <VStack gap="4">
                        <Search
                            name="skyldner"
                            label={
                                <Heading level="2" size="medium">
                                    Søk etter skyldner
                                </Heading>
                            }
                            hideLabel={false}
                            value={skyldner}
                            onChange={setSkyldner}
                            onClear={handleClear}
                            disabled={kravoversiktQuery.isLoading}
                        />
                        <RadioGroup
                            name="type"
                            legend="Velg skyldnertype"
                            value={skyldnertype}
                            onChange={(value) =>
                                setSkyldnertype(value as Skyldnertype)
                            }
                        >
                            <Radio value="fødselsnummer">Fødselsnummer</Radio>
                            <Radio value="orgnummer">Orgnummer</Radio>
                        </RadioGroup>
                        <RadioGroup
                            name="kravfilter"
                            legend="Velg kravfilter"
                            value={kravfilter}
                            onChange={(value) =>
                                setKravfilter(value as Kravfilter)
                            }
                        >
                            <Radio value="ALLE">Alle</Radio>
                            <Radio value="ÅPNE">Åpne</Radio>
                            <Radio value="LUKKEDE">Lukkede</Radio>
                            <Radio value="INGEN">Ingen</Radio>
                        </RadioGroup>
                    </VStack>
                </form>
                {kravoversiktQuery.data && (
                    <Kravtabell krav={kravoversiktQuery.data.krav} />
                )}
                {kravoversiktQuery.error && (
                    <Alert variant="error">
                        Feil ved søk: {kravoversiktQuery.error.message}
                    </Alert>
                )}
            </div>
            <Outlet />
        </HGrid>
    );
}
