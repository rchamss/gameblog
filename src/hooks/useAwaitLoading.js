import { useEffect, useState } from "react"

export default function useAwaitLoading(dados) {
    const [pronto, setPronto] = useState(false)

    useEffect(() => {
        // 1. Se é um Array e já tem itens, libera a tela NA HORA (0 segundos).
        if (Array.isArray(dados) && dados.length > 0) {
            setPronto(true);
            return;
        }

        // 2. Se é um Objeto (como o carrinho) e já tem propriedades, libera NA HORA.
        if (dados && !Array.isArray(dados) && Object.keys(dados).length > 0) {
            setPronto(true);
            return;
        }

        // 3. Se estiver indefinido ou vazio, ativamos o tempo de segurança.
        // Isso impede que a tela quebre antes da requisição da API de fato terminar.
        const timer = setTimeout(() => {
            setPronto(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [dados])

    return pronto
}