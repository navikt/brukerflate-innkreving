import { z } from "zod";

const SkyldnertypeSchema = z.enum(["fødselsnummer", "orgnummer"]);
const KravfilterSchema = z.enum(["ALLE", "ÅPNE", "LUKKEDE", "INGEN"]);

export const SkyldnerSchema = z.object({
    skyldner: z.coerce.string().default(""),
    type: SkyldnertypeSchema.default("fødselsnummer"),
    kravfilter: KravfilterSchema.default("ALLE"),
});

export type Skyldnertype = z.infer<typeof SkyldnertypeSchema>;
export type Kravfilter = z.infer<typeof KravfilterSchema>;
