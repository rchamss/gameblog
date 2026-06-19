import { useContext, useEffect, useState } from "react"
import { MensagemContext } from "../../../../pages/_app"
import {apiPath} from "../../../../infra/api";
import {useRequireLogin} from "../../useRequireLogin";

export default function useBuscarCarrinhos(){ //Requisita a avaliação do jogo para a API (Precisa do ID do jogo)
    const [ carrinhos, setCarrinhos ] = useState([])
    const { mostrarMensagem } = useContext(MensagemContext)
    const {token} = useRequireLogin()

    useEffect(() => {

        if (!token) return // Protege o carregamento para não executar a requisição sem o token ou o gameId

        async function getAPI() {
            try{
                const resposta = await fetch(`${apiPath}/carrinho`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(!resposta.ok)
                { throw { status: resposta.status, mensagem: api.message }
                }
                
                const api = await resposta.json()
                setCarrinhos(api)
                
            }
            catch(error) {
                mostrarMensagem(error.status, error.mensagem)
            }

        }
        getAPI()
    }, [token])
    return carrinhos
}