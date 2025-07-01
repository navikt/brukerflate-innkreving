import { Heading, Radio, RadioGroup, Search, VStack } from "@navikt/ds-react";
import { Kravfilter, Skyldnertype } from "../types/skyldner";

interface SkyldnerSearchFormProps {
    initiellSkyldner?: string;
    initiellType?: Skyldnertype;
    initiellKravfilter?: Kravfilter;
    action: string;
}

export default function SkyldnerSøkeskjema({
    initiellSkyldner = "",
    initiellType = "fødselsnummer",
    initiellKravfilter = "ALLE",
    action,
}: SkyldnerSearchFormProps) {
    return (
        <form role="search" action={action}>
            <VStack gap="4">
                <Search
                    name="skyldner"
                    label={
                        <Heading level="2" size="medium">
                            Søk etter skyldner
                        </Heading>
                    }
                    hideLabel={false}
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
                <RadioGroup
                    name="kravfilter"
                    legend="Velg kravfilter"
                    defaultValue={initiellKravfilter}
                >
                    <Radio value={"ALLE" as Kravfilter}>Alle</Radio>
                    <Radio value={"ÅPNE" as Kravfilter}>Åpne</Radio>
                    <Radio value={"LUKKEDE" as Kravfilter}>Lukkede</Radio>
                    <Radio value={"INGEN" as Kravfilter}>Ingen</Radio>
                </RadioGroup>
            </VStack>
        </form>
    );
}
