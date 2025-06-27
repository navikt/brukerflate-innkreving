import { Heading, Radio, RadioGroup, Search, VStack } from "@navikt/ds-react";
import { Skyldnertype } from "../types/skyldner";

interface SkyldnerSearchFormProps {
    initiellSkyldner?: string;
    initiellType?: Skyldnertype;
    action: string;
}

export default function SkyldnerSøkeskjema({
    initiellSkyldner = "",
    initiellType = "fødselsnummer",
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
            </VStack>
        </form>
    );
}
