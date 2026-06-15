import { useContext, useEffect, useState } from "react"
import { MensagemContext } from "../../../../pages/_app"

export default function useRequestStars(token, gameId){ //Requisita a avaliação do jogo para a API (Precisa do ID do jogo)
    const [stars, setStars] = useState([])
    const { mensagemSistema } = useContext(MensagemContext)
    
    useEffect(() => {

         if (!token || !gameId) return // Protege o carregamento para não executar a requisição sem o token ou o gameId

        async function getAPI() {
            try{
                const resposta = await fetch(`https://gameblog-api.onrender.com/api/v1/avaliacoes?jogoId=${gameId}`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                })
            const api = await resposta.json()
             if(!resposta.ok){ 
                throw { status: resposta.status, mensagem: api.message }
            }
            setStars(api)
            }
            catch(error) {
                mostrarMensagem(error.status, error.mensagem)
            }
            
        }
        getAPI()
    }, [gameId])
    return stars
}