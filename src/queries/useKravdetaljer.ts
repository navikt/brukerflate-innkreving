import { useQuery } from "@tanstack/react-query";
import hentKravdetaljer, {
    KravdetaljerRequest,
} from "../server/hentKravdetaljer";

export default function useKravdetaljer(
    kravdetaljerRequest: KravdetaljerRequest,
) {
    return useQuery({
        queryKey: [
            "kravdetaljer",
            kravdetaljerRequest.id,
            kravdetaljerRequest.type,
        ],
        queryFn: () => hentKravdetaljer({ data: kravdetaljerRequest }),
        staleTime: Infinity, // Prevent data from becoming stale
        refetchOnWindowFocus: false, // Prevent refetching when window regains focus
        refetchOnMount: false, // Prevent refetching when component remounts
    });
}
