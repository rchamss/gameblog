import React, { useEffect, useState } from "react"

export default function Gameblog(){

    const [jogos, setJogos] = useState([])

    useEffect(() => {
        async function getAPI() {
            const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/public/jogos')
            const api = await resposta.json()
            console.log(api)
            setJogos(api)
        }
        getAPI()
    }, [])
    
    return (
        <div>
            <h1>Olá, Mundo! Estou na pagina inicial!</h1>
            {jogos.map((i) => (
                <p>{i.nome}</p>
            ))}
        </div>
    )
}