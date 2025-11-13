import { useQuery } from "@tanstack/react-query";
import hentKravdetaljer, {
    KravdetaljerRequest,
} from "../server/hentKravdetaljer";
import { useServerFn } from "@tanstack/react-start";

export default function useKravdetaljer(
    kravdetaljerRequest: KravdetaljerRequest,
) {
    const kravdetaljer = useServerFn(hentKravdetaljer);
    return useQuery({
        queryKey: [
            "kravdetaljer",
            kravdetaljerRequest.id,
            kravdetaljerRequest.type,
        ],
        queryFn: () => kravdetaljer({ data: kravdetaljerRequest }),
        refetchOnWindowFocus: false,
    });
}
