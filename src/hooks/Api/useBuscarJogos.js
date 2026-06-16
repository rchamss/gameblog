import { useContext, useEffect, useState } from "react"
import { useRequireLogin } from "../useRequireLogin"
import { MensagemContext } from "../../../pages/_app"
import { useRouter } from "next/router"

export default function usePublicBuscarJogos(){ //Retorna os jogos disponiveis na rota publica da API
    const [jogos, setJogos] = useState([])
    useEffect(() => {
        async function getAPI() {
            const resposta = await fetch('https://gameblog-api-production-817a.up.railway.app/api/v1/public/jogos')
            const api = await resposta.json()
            setJogos(api)
        }
        getAPI()
    }, [])
    return jogos
}
