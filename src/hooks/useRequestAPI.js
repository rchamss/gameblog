import { useEffect, useState } from "react"

export function useRequestJogos(){
    const [jogos, setJogos] = useState([])
    useEffect(() => {  //Requisita os jogos disponiveis na API
        async function getAPI() {
            const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/public/jogos')
            const api = await resposta.json()
            setJogos(api)
        }
        getAPI()
    }, [])
    return jogos
}
export function useRequestCategorias(){
    const jogos = useRequestJogos()
    const [categorias, setCategorias] = useState([])

    useEffect(() => {  //Retorna uma lista com as categorias de jogos da api
        const listaCategorias = [... new Set(jogos.map((jogo) => jogo.categoria))]
        setCategorias(listaCategorias)
    }, [jogos])
    return categorias
}