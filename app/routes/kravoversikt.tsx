import {createFileRoute} from '@tanstack/react-router'

export type Skyldnertype = 'fødselsnummer' | 'orgnummer';

interface Skyldner {
    skyldner: string
    type: Skyldnertype
}

export const Route = createFileRoute('/kravoversikt')({
    component: Kravoversikt,
    validateSearch: (search: Record<string, unknown>): Skyldner => {
        return {
            skyldner: search.skyldner as string | '',
            type: search.type as Skyldnertype | 'fødselsnummer',
        }
    },
    beforeLoad: ({search}) => {
        console.log(search)
    },
})

function Kravoversikt() {
    const search = Route.useSearch()
    return <div>{JSON.stringify(search)}</div>
}
