import { useContext, useEffect, useState } from "react"
import { useRequireLogin } from "./useRequireLogin"
import { MensagemContext } from "../../pages/_app"
import { useRouter } from "next/router"

export function useRequestJogos(){ //Requisita os jogos disponiveis na API
    const [jogos, setJogos] = useState([])
    useEffect(() => {
        async function getAPI() {
            const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/public/jogos')
            const api = await resposta.json()
            setJogos(api)
        }
        getAPI()
    }, [])
    return jogos
}

export function useRequestJogos_private(){ //Requisita os jogos disponiveis na API
    const { mostrarMensagem } = useContext(MensagemContext)
    const [jogos, setJogos] = useState([])
    const token = useRequireLogin()
    const router = useRouter()
    useEffect(() => {
        if (!token) return
        async function getAPI() {
            try{
                const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/jogos', {
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

export function useRequestCategorias(){ //Retorna uma lista com as categorias de jogos da api
    const jogos = useRequestJogos()
    const [categorias, setCategorias] = useState([])

    useEffect(() => {  
        const listaCategorias = [... new Set(jogos.map((jogo) => jogo.categoria))]
        setCategorias(listaCategorias)
    }, [jogos])
    return categorias
}

export function useRequestStars(token, gameId){ //Requisita a avaliação do jogo para a API (Precisa do ID do jogo)
    const [stars, setStars] = useState([])
    
    useEffect(() => {

         if (!token || !gameId) return // Protege o carregamento para não executar a requisição sem o token ou o gameId

        async function getAPI() {
            const resposta = await fetch(`https://gameblog-api.onrender.com/api/v1/avaliacoes?jogoId=${gameId}`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            console.log('status:', resposta.status)
            const api = await resposta.json()
            console.log(resposta)
            console.log(api)
            setStars(api)
        }
        getAPI()
    }, [gameId])
    return stars
}
