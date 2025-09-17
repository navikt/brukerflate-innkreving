import { useEffect, useState } from "react";
import { type SkyldnerData, SkyldnerSchema } from "../types/skyldner";

const SEARCH_STATE_KEY = "kravoversikt-search-state";

export function useSearchState() {
    const [searchState, setSearchState] = useState<SkyldnerData>(
        SkyldnerSchema.parse({}),
    );

    useEffect(() => {
        const saved = sessionStorage.getItem(SEARCH_STATE_KEY);
        setSearchState(
            saved ?
                SkyldnerSchema.parse(JSON.parse(saved))
            :   SkyldnerSchema.parse({}),
        );
    }, []);

    const updateSearchState = (updates: Partial<SkyldnerData>) => {
        const newState = { ...searchState, ...updates };
        setSearchState(newState);
        sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(newState));
    };

    const clearSearchState = () => {
        const defaultState = SkyldnerSchema.parse({});
        setSearchState(defaultState);
        sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(defaultState));
    };

    return {
        searchState,
        updateSearchState,
        clearSearchState,
    };
}
