import { z } from "zod";

const SøketypeSchema = z.enum(["SKYLDNER", "NAV", "SKATTEETATEN"]);
const KravfilterSchema = z.enum(["ALLE", "ÅPNE", "LUKKEDE", "INGEN"]);

export const SøkSchema = z.object({
    søketekst: z.coerce.string().default(""),
    søketype: SøketypeSchema.default("SKYLDNER"),
    kravfilter: KravfilterSchema.default("ALLE"),
});

export type Søk = z.infer<typeof SøkSchema>;
