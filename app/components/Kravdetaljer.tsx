/*
{
	"kravgrunnlag": {
		"datoNårKravVarBesluttetHosOppdragsgiver": "2025-05-15"
	},
	"kravlinjer": [
		{
			"kravlinjetype": "hovedstol",
			"opprinneligBeløp": 15000,
			"gjenståendeBeløp": 7500
		},
		{
			"kravlinjetype": "rentetilleggVedTilbakekrevingAvFeilutbetalingerFraNAV",
			"opprinneligBeløp": 4500,
			"gjenståendeBeløp": 1500
		}
	]
}
 */
export interface KravdetaljerProps {
    kravgrunnlag: {
        datoNårKravVarBesluttetHosOppdragsgiver: string
    },
    kravlinjer: {
        kravlinjetype: string,
        opprinneligBeløp: number,
        gjenståendeBeløp: number
    }[]
}

export default function Kravdetaljer(props: KravdetaljerProps) {
    return (
        <>
            <p>{props.kravgrunnlag.datoNårKravVarBesluttetHosOppdragsgiver}</p>
            {props.kravlinjer.map((kravlinje) => {
                return (
                    <>
                        <p>{kravlinje.kravlinjetype}</p>
                        <p>{kravlinje.opprinneligBeløp}</p>
                        <p>{kravlinje.gjenståendeBeløp}</p>
                    </>
                )
            })}
        </>
    )
}
