import { useServerFn } from "@tanstack/react-start";
import { hentKravoversikt } from "../server/hentKravoversikt";
import { useMutation } from "@tanstack/react-query";
import { Søk } from "../types/skyldner";

export default function useKravoversikt() {
    const kravoversikt = useServerFn(hentKravoversikt);
    return useMutation({
        mutationFn: (søk: Søk) => kravoversikt({ data: søk }),
    });
}
