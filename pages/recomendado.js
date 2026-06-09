import React, { useContext } from "react"
import { TestContext } from "../src/context/TestContext"

export default function Recomendado(){
    const test = useContext(TestContext)
    console.log(test.test)
    return (
        <h1>Olá, Mundo! Estou na pagina de Recomendado</h1>
    )
}