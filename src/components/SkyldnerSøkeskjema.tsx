import { Heading, Radio, RadioGroup, Search, VStack } from "@navikt/ds-react";
import { useState } from "react";
import { Kravfilter, type SkyldnerData, Skyldnertype } from "../types/skyldner";

interface SkyldnerSearchFormProps {
    onSubmit: (data: SkyldnerData) => void;
    isLoading?: boolean;
    initiellSkyldner?: string;
    initiellType?: Skyldnertype;
    initiellKravfilter?: Kravfilter;
}

export default function SkyldnerSøkeskjema({
    onSubmit,
    isLoading = false,
    initiellSkyldner = "",
    initiellType = "fødselsnummer",
    initiellKravfilter = "ALLE",
}: SkyldnerSearchFormProps) {
    const [skyldner, setSkyldner] = useState(initiellSkyldner);
    const [type, setType] = useState<Skyldnertype>(initiellType);
    const [kravfilter, setKravfilter] =
        useState<Kravfilter>(initiellKravfilter);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (skyldner.trim()) {
            onSubmit({
                skyldner: skyldner.trim(),
                type,
                kravfilter,
            });
        }
    };

    return (
        <form role="search" onSubmit={handleSubmit}>
            <VStack gap="4">
                <Search
                    label={
                        <Heading level="2" size="medium">
                            Søk etter skyldner
                        </Heading>
                    }
                    hideLabel={false}
                    value={skyldner}
                    onChange={setSkyldner}
                    disabled={isLoading}
                />
                <RadioGroup
                    legend="Velg skyldnertype"
                    value={type}
                    onChange={setType}
                >
                    <Radio value="fødselsnummer">Fødselsnummer</Radio>
                    <Radio value="orgnummer">Orgnummer</Radio>
                </RadioGroup>
                <RadioGroup
                    legend="Velg kravfilter"
                    value={kravfilter}
                    onChange={setKravfilter}
                >
                    <Radio value="ALLE">Alle</Radio>
                    <Radio value="ÅPNE">Åpne</Radio>
                    <Radio value="LUKKEDE">Lukkede</Radio>
                    <Radio value="INGEN">Ingen</Radio>
                </RadioGroup>
            </VStack>
        </form>
    );
}
