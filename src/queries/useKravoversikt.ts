import { useServerFn } from "@tanstack/react-start";
import hentKravoversikt from "../server/hentKravoversikt";
import { useMutation } from "@tanstack/react-query";

export default function useKravoversikt() {
    const kravoversikt = useServerFn(hentKravoversikt);
    return useMutation({
        mutationFn: kravoversikt,
    });
}
