import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import SkyldnerSøkeskjema from "../components/SkyldnerSøkeskjema";
import { HGrid } from "@navikt/ds-react";
import type { Kravoversikt } from "../server/hentKravoversikt";
import { hentKravoversikt } from "../server/hentKravoversikt";
import Kravtabell from "../components/Kravtabell";
import type { SkyldnerData } from "../types/skyldner";

export const Route = createFileRoute("/kravoversikt")({
    component: Kravoversikt,
});

function Kravoversikt() {
    const [searchResults, setSearchResults] = useState<Kravoversikt | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (searchData: SkyldnerData) => {
        setIsLoading(true);
        try {
            const results = await hentKravoversikt({ data: searchData });
            setSearchResults(results);
        } catch (error) {
            console.error("Search failed:", error);
            setSearchResults(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <HGrid columns="1fr 3fr" className="pt-4">
            <div className="space-y-6">
                <SkyldnerSøkeskjema
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                />
                {searchResults && <Kravtabell krav={searchResults.krav} />}
            </div>
            <div>
                <Outlet />
            </div>
        </HGrid>
    );
}
