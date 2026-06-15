import React, { useContext, useEffect, useState } from "react"
import { useRequireLogin } from "../src/hooks/useRequireLogin"
import Link from "next/link"
import usePublicBuscarJogos from "../src/hooks/Api/useBuscarJogos"

export default function Gameblog(){
    const jogos = usePublicBuscarJogos()
    return (
         <main>
            <h1>Olá, Mundo! Estou na pagina inicial!</h1>
            {jogos.map((i) => (
                <p><Link href={`/jogo/${i.nome}`}>{i.nome}</Link></p>
            ))}
        </main>
    )
}