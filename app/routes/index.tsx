import {createFileRoute, Outlet} from '@tanstack/react-router'
import {Radio, RadioGroup, Search} from "@navikt/ds-react";

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
                <RadioGroup name="type" legend="Velg skyldnertype" defaultValue={'fødselsnummer'}>
                    <Radio value={'fødselsnummer'}>Fødselsnummer</Radio>
                    <Radio value={'orgnummer'}>Orgnummer</Radio>
                </RadioGroup>
            </form>
            <Outlet/>
        </>
    )
}
