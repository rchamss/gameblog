import React, { useState } from "react"
import { useRequestCategorias } from "../src/hooks/useRequestAPI"

export default function Categorias(){
    const categorias = useRequestCategorias()

    return (
        <div>
            <h2>Tipos de Jogos</h2>
            {categorias.map((item) => <p key={item}>{item}</p>)}
            <h2>Outras Categorias</h2>
        </div>
    )
}