import React, { useState } from "react"
import useBuscarCategorias from "../src/hooks/Api/protected/useBuscarCategorias"
import Link from "next/link"


export default function Categorias(){
    const categorias = useBuscarCategorias()
    console.log(categorias)

    return (
        <main>
            <h2>Tipos de Jogos</h2>
            {categorias.map((item) => <Link key={item.id} href={`/categoria/${item.nome}`}>{item.nome}<br/></Link>)}
            <h2>Outras Categorias</h2>
        </main>
    )
}