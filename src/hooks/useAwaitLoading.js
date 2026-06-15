import { useEffect, useState } from "react"

export default function useAwaitLoading(dados){ // Recebe uma array de dados e apenas libera depois de 1s
    const [pronto, setPronto] = useState(false)

    useEffect(() =>{
        if(dados && dados.length > 0){
            const timer = setTimeout(() => setPronto(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [dados])

    return pronto
}