import React, { useState } from "react"
import useBuscarCategorias from "../src/hooks/Api/protected/useBuscarCategorias"


export default function Categorias(){
    const categorias = useBuscarCategorias()
    console.log(categorias)

    return (
        <main>
            <h2>Tipos de Jogos</h2>
            {categorias.map((item) => <p key={item.id}>{item.nome}</p>)}
            <h2>Outras Categorias</h2>
        </main>
    )
}