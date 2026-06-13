import { useEffect, useState } from "react"

export default function useAwaitLoading(dados){
    const [pronto, setPronto] = useState(false)

    useEffect(() =>{
        if(dados && dados.length > 0){
            const timer = setTimeout(() => setPronto(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [dados])

    return pronto
}