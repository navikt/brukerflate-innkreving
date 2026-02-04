import { useQuery } from "@tanstack/react-query";
import hentKravdetaljer from "../server/hentKravdetaljer";
import { useServerFn } from "@tanstack/react-start";
import { HentKravdetaljerJsonRequest } from "../generated/model";

export default function useKravdetaljer(
    kravdetaljerRequest: HentKravdetaljerJsonRequest,
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
