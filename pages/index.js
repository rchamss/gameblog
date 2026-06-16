import React from "react"
import Link from "next/link"
import usePublicBuscarJogos from "../src/hooks/Api/useBuscarJogos"
import useBuscarUsuario from "../src/hooks/Api/protected/useBuscarUsuario";

export default function Gameblog(){
    const jogos = usePublicBuscarJogos()
    const user = useBuscarUsuario()
    console.log(user)
    return (
         <main>
            <h1>Olá, Mundo! Estou na pagina inicial!</h1>
            {jogos.map((i) => (
                <p><Link href={`/jogo/${i.nome}`}>{i.nome}</Link></p>
            ))}
        </main>
    )
}