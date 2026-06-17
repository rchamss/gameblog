import { useContext, useEffect, useState } from "react"
import { MensagemContext } from "../../../../pages/_app"
import {apiPath} from "../../../../infra/api";
import {useRequireLogin} from "../../useRequireLogin";

export default function useBuscarAvaliacoes(gameId){ //Requisita a avaliação do jogo para a API (Precisa do ID do jogo)
    const [stars, setStars] = useState([])
    const { mostrarMensagem } = useContext(MensagemContext)
    const {token} = useRequireLogin()
    
    useEffect(() => {

         if (!token || !gameId) return // Protege o carregamento para não executar a requisição sem o token ou o gameId

        async function getAPI() {
            try{
                const resposta = await fetch(`${apiPath}/avaliacoes/media/${gameId}`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                })
                if(!resposta.ok)
                    {throw { status: resposta.status, mensagem: api.message }
                }

                try{
                    const api = await resposta.json()
                    setStars(api)
                }
                catch (error) {
                    mostrarMensagem(400, 'Este jogo não possui avaliações')
                }
                }
            catch(error) {
                mostrarMensagem(error.status, error.mensagem)
            }
            
        }
        getAPI()
    }, [gameId, token])
    return stars
}