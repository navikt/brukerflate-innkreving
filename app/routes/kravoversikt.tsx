import {createFileRoute, Outlet} from '@tanstack/react-router'
import {Radio, RadioGroup, Search} from "@navikt/ds-react";
import {zodValidator} from "@tanstack/zod-adapter";
import {SkyldnerSchema, Skyldnertype} from "./kravoversikt.resultat";

export const Route = createFileRoute('/kravoversikt')({
    component: Kravoversikt,
    validateSearch: zodValidator(SkyldnerSchema.optional())
})

function Kravoversikt() {
    const search = Route.useSearch()
    return (
        <>
            <form role="search" action="/kravoversikt/resultat">
                <Search
                    name="skyldner"
                    label="Søk etter skyldner"
                    defaultValue={search?.skyldner}
                />
                <RadioGroup
                    name="type"
                    legend="Velg skyldnertype"
                    defaultValue={search?.type || 'fødselsnummer' as Skyldnertype}
                >
                    <Radio value={'fødselsnummer' as Skyldnertype}>Fødselsnummer</Radio>
                    <Radio value={'orgnummer' as Skyldnertype}>Orgnummer</Radio>
                </RadioGroup>
            </form>
            <Outlet/>
        </>
    )
}
