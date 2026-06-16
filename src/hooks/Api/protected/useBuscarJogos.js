import { useContext, useEffect, useState } from "react"
import { MensagemContext } from "../../../../pages/_app"
import { useRouter } from "next/router"
import { useRequireLogin } from "../../useRequireLogin"


export default function useBuscarJogos(){ //Requisita os jogos disponiveis na API na rota privada
    const { mostrarMensagem } = useContext(MensagemContext)
    const [jogos, setJogos] = useState([])
    const token = useRequireLogin()
    const router = useRouter()
    useEffect(() => {
        if (!token) return
        async function getAPI() {
            try{
                const resposta = await fetch('https://gameblog-api-production-817a.up.railway.app/api/v1/jogos', {
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