import {z} from "zod";

const SkyldnertypeSchema = z.enum(['fødselsnummer', 'orgnummer']);

export const SkyldnerSchema = z.object({
    skyldner: z.coerce.string().default(""),
    type: SkyldnertypeSchema.default("fødselsnummer")
})

export type Skyldnertype = z.infer<typeof SkyldnertypeSchema>
