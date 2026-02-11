import { queryOptions } from "@tanstack/react-query";
import hentKravdetaljer from "../server/hentKravdetaljer";
import { HentKravdetaljerJsonRequest } from "../generated/model";

export function kravdetaljerQueryOptions(
    request: HentKravdetaljerJsonRequest,
) {
    return queryOptions({
        queryKey: ["kravdetaljer", request.id, request.type],
        queryFn: () => hentKravdetaljer({ data: request }),
    });
}
