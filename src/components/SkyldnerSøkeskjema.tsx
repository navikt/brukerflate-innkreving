import { Radio, RadioGroup, Search } from "@navikt/ds-react";
import { Skyldnertype } from "../types/skyldner";

interface SkyldnerSearchFormProps {
    initiellSkyldner?: string;
    initiellType?: Skyldnertype;
    action: string;
}

export function SkyldnerSøkeskjema({
    initiellSkyldner = "",
    initiellType = "fødselsnummer",
    action,
}: SkyldnerSearchFormProps) {
    return (
        <form role="search" action={action}>
            <Search
                name="skyldner"
                label="Søk etter skyldner"
                defaultValue={initiellSkyldner}
            />
            <RadioGroup
                name="type"
                legend="Velg skyldnertype"
                defaultValue={initiellType}
            >
                <Radio value={"fødselsnummer" as Skyldnertype}>
                    Fødselsnummer
                </Radio>
                <Radio value={"orgnummer" as Skyldnertype}>Orgnummer</Radio>
            </RadioGroup>
        </form>
    );
}
