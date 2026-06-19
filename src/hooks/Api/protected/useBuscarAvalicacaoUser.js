import { useContext, useEffect, useState } from "react"
import { MensagemContext } from "../../../../pages/_app"
import {apiPath} from "../../../../infra/api";
import {useRequireLogin} from "../../useRequireLogin";

export default function useBuscarAvaliacoes(){ //Requisita a avaliação do jogo para a API (Precisa do ID do jogo)
    const [stars, setStars] = useState([])
    const { mostrarMensagem } = useContext(MensagemContext)
    const {token} = useRequireLogin()
    
    useEffect(() => {

         if (!token) return // Protege o carregamento para não executar a requisição sem o token ou o gameId

        async function getAPI() {
            const resposta = await fetch(`${apiPath}/avaliacoes`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                })

                if(resposta.status === 204){
                    return
                }
                
                if(!resposta.ok)
                    {throw { status: resposta.status, mensagem: api.message }
                }

                const api = await resposta.json()
                setStars(api)
            
        }
        getAPI()
    }, [token])
    return stars
}