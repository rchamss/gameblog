import style from "../../src/style/pages/jogo/[id].module.css"
import Carregamento from "../../src/components/loading";
import { useRequestJogos, useRequestJogos_private, useRequestStars } from "../../src/hooks/useRequestAPI";
import { useRouter } from "next/router"
import { jogosData } from "../../src/data/complementaryData";
import { createContext, useEffect } from "react";
import useAwaitLoading from "../../src/hooks/useAwaitLoading";
import ApresentacaoJogo from "../../src/components/jogo/ApresentacaoJogo";
import { useRequireLogin } from "../../src/hooks/useRequireLogin";

export const JogoContext = createContext({})

export default function Jogo() {
    const router = useRouter()
    const paginaPronta = router.isReady

    const jogosLista = useRequestJogos_private() 
    const dadosProntos = useAwaitLoading(jogosLista)

    const jogo = jogosLista.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase())
    const jogoComplementaryData = jogosData.find((item) => item.nome.toLowerCase() === jogo?.nome.toLowerCase())

    const jogoStars = useRequestStars(useRequireLogin(), jogo?.id)
    console.log(jogoStars)
    console.log(jogo)

    if (paginaPronta && dadosProntos) {
        if (jogo) {
            return (
                <JogoContext value={{jogo, jogoComplementaryData}}>
                    <div className={style.container_pg}>
                        <ApresentacaoJogo/>
                    </div>
                </JogoContext>
            )
        }
        else { 
            return (
                <main className={style.notFound}>
                    <div className={style.iconeContainer}>
                        <img src="/assets/404.svg"/>
                    </div>
                    <h1>Oops!</h1>
                    <p>Não encontramos nada aqui. Tem certeza que veio no lugar certo?</p>
                </main>
            )
        }
    }
    else{
        return (
            <div className={style.container_carregamento}>
                <Carregamento /> 
            </div>
        )
    }
    
}