import React, { useContext, useEffect, useState } from "react"
import { useRequireLogin } from "../src/hooks/useRequireLogin"
import { useRequestJogos } from "../src/hooks/useRequestAPI"
import Link from "next/link"

export default function Gameblog(){
    const jogos = useRequestJogos()
    return (
         <div>
            <h1>Olá, Mundo! Estou na pagina inicial!</h1>
            {jogos.map((i) => (
                <p><Link href={`/jogo/${i.nome}`}>{i.nome}</Link></p>
            ))}
        </div>
    )
}