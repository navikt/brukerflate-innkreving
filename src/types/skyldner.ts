import { z } from "zod";
import { PostInternalKravoversiktBody } from "../generated/tilbakekreving/tilbakekrevingAPI";

const SøketypeSchema = z.enum(["SKYLDNER", "NAV", "SKATTEETATEN"]);
const KravfilterSchema = PostInternalKravoversiktBody.pick({
    kravfilter: true,
});

export const SøkSchema = z.object({
    søketekst: z.coerce.string().default(""),
    søketype: SøketypeSchema.default("SKYLDNER"),
    ...KravfilterSchema.shape,
});

export type Søk = z.infer<typeof SøkSchema>;
