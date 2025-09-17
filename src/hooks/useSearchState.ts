import { useEffect, useState } from "react";
import { type SkyldnerData, SkyldnerSchema } from "../types/skyldner";

const SEARCH_STATE_KEY = "kravoversikt-search-state";

const defaultSearchState: SkyldnerData = {
    skyldner: "",
    type: "fødselsnummer",
    kravfilter: "ALLE",
};

export function useSearchState() {
    const [searchState, setSearchState] = useState<SkyldnerData>(
        defaultSearchState,
    );

    useEffect(() => {
        const saved = sessionStorage.getItem(SEARCH_STATE_KEY);
        setSearchState(
            saved ?
                SkyldnerSchema.parse(JSON.parse(saved))
            :   defaultSearchState,
        );
    }, []);

    const updateSearchState = (updates: Partial<SkyldnerData>) => {
        const newState = { ...searchState, ...updates };
        setSearchState(newState);
        sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(newState));
    };

    const clearSearchState = () => {
        setSearchState(defaultSearchState);
        sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(defaultSearchState));
    };

    return {
        searchState,
        updateSearchState,
        clearSearchState,
    };
}
