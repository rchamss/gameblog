import { useContext, useEffect, useState } from "react"
import { MensagemContext } from "../../../../pages/_app"
import { useRouter } from "next/router"
import { useRequireLogin } from "../../useRequireLogin"
import {apiPath} from "../../../../infra/api";


export default function useBuscarJogos(){ //Requisita os jogos disponiveis na API na rota privada
    const { mostrarMensagem } = useContext(MensagemContext)
    const [jogos, setJogos] = useState([])
    const {token} = useRequireLogin()
    const router = useRouter()
    useEffect(() => {
        if (!token) return
        async function getAPI() {
            try{
                const resposta = await fetch(`${apiPath}/jogos`, {
                headers: {'Authorization': `Bearer ${token}`}})
                const api = await resposta.json()
                
                if(!resposta.ok){
                    throw { status: resposta.status, mensagem: api.message }
                }
                setJogos(api)
            }
            catch(error) {
                router.push('/login')
                mostrarMensagem(error.status, error.mensagem)
            }
        }
        getAPI()
    }, [token])
    return jogos
}