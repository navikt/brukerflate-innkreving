import {createFileRoute, Outlet} from '@tanstack/react-router'
import {Radio, RadioGroup, Search} from "@navikt/ds-react";
import {Skyldnertype} from "./kravoversikt";

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <>
            <form role="search" action="/kravoversikt">
                <Search
                    name="skyldner"
                    label="Søk etter skyldner"
                />
                <RadioGroup name="type" legend="Velg skyldnertype" defaultValue={'fødselsnummer' as Skyldnertype}>
                    <Radio value={'fødselsnummer' as Skyldnertype}>Fødselsnummer</Radio>
                    <Radio value={'orgnummer' as Skyldnertype}>Orgnummer</Radio>
                </RadioGroup>
            </form>
            <Outlet/>
        </>
    )
}
