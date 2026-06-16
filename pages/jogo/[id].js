import style from "../../src/style/pages/jogo/[id].module.css"
import Carregamento from "../../src/components/loading";
import { useRouter } from "next/router"
import { jogosData } from "../../src/data/complementaryData";
import { createContext, useEffect } from "react";
import useAwaitLoading from "../../src/hooks/useAwaitLoading";
import ApresentacaoJogo from "../../src/components/jogo/ApresentacaoJogo";
import { useRequireLogin } from "../../src/hooks/useRequireLogin";
import useBuscarJogos from "../../src/hooks/Api/protected/useBuscarJogos";
import usePublicBuscarJogos from "../../src/hooks/Api/useBuscarJogos";

export const JogoContext = createContext({})

export default function Jogo() {
    const router = useRouter()
    const paginaPronta = router.isReady

    const jogosLista = useBuscarJogos()
    const dadosProntos = useAwaitLoading(jogosLista)
    const jogosListaPublic = usePublicBuscarJogos()

    const jogo = jogosLista.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase())
    const jogoPublic = jogosListaPublic.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase())
    const jogoComplementaryData = jogosData.find((item) => item.nome.toLowerCase() === jogo?.nome.toLowerCase())

    console.log(jogo)

    if (paginaPronta && dadosProntos) {
        if (jogo) {
            return ( // Achou Jogo
                <JogoContext value={{jogo, jogoComplementaryData, jogoPublic}}>
                    <img src={jogoComplementaryData.hero} className={style.hero}/>
                    <main className={style.container_pg}>
                        <ApresentacaoJogo/>
                    </main>
                </JogoContext>
            )
        }
        else { 
            return ( //404 
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