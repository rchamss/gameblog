import { useEffect } from "react";
import { useRouter } from "next/router";

import { useRequireLogin } from "../src/hooks/useRequireLogin";
import useBuscarJogos from "../src/hooks/Api/protected/useBuscarJogos";

export default function Recomendado() {
    useRequireLogin();

    const router = useRouter();
    const jogos = useBuscarJogos();

    useEffect(() => {
        if (jogos.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * jogos.length);
            const jogoAleatorio = jogos[indiceAleatorio];

            router.push(`jogo/${jogoAleatorio.nome}`);
        }
    }, [jogos]);

    return <h1>Escolhendo um jogo para você...</h1>;
}