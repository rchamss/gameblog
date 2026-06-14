import { useEffect, useState } from "react"
import { useRequireLogin } from "./useRequireLogin"

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
export function useRequestCategorias(){ //Retorna uma lista com as categorias de jogos da api
    const jogos = useRequestJogos()
    const [categorias, setCategorias] = useState([])

    useEffect(() => {  
        const listaCategorias = [... new Set(jogos.map((jogo) => jogo.categoria))]
        setCategorias(listaCategorias)
    }, [jogos])
    return categorias
}

export function useRequestJogos_private(){ //Requisita os jogos disponiveis na API
    const [jogos, setJogos] = useState([])
    const token = useRequireLogin()
    useEffect(() => {
        if (!token) return
        async function getAPI() {
            const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/jogos', {
                headers: {'Authorization': `Bearer ${token}`}})
            const api = await resposta.json()
            setJogos(api)
        }
        getAPI()
    }, [token])
    return jogos
}