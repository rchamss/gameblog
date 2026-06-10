import React, { useContext } from "react"
import { useRequireLogin } from "../src/hooks/useRequireLogin"

export default function Recomendado(){
    useRequireLogin() // Hook de Proteção de Pagina
    return (
        <h1>Olá, Mundo! Estou na pagina de Recomendado</h1>
    )
}