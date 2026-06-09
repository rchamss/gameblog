import React, { useEffect } from "react"

export default function Distribuir(){
    const testContext = useContext(TestContext)
        useEffect(() => {
            testContext.setTest('agora foi porra')
        }, [])
        console.log(testContext.test)
    return (
        <h1>Olá, Mundo! Estou na pagina de Distribuir</h1>
    )
}