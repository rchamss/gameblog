import style from "../../src/style/pages/jogo/[id].module.css"
import Carregamento from "../../src/components/loading";
import { useRouter } from "next/router"
import { jogosData } from "../../src/data/complementaryData";
import { createContext, useEffect, useState } from "react"; // Adicionado useState aqui
import useAwaitLoading from "../../src/hooks/useAwaitLoading";
import ApresentacaoJogo from "../../src/components/jogo/ApresentacaoJogo";
import { useRequireLogin } from "../../src/hooks/useRequireLogin";
import useBuscarJogos from "../../src/hooks/Api/protected/useBuscarJogos";
import usePublicBuscarJogos from "../../src/hooks/Api/useBuscarJogos";
import GaleriaJogo from "../../src/components/jogo/GaleriaJogo";
import EscreverAvaliacao from "../../src/components/jogo/gameCreateAvaliacao";
import TitulosSimilares from "../../src/components/jogo/gameSimilares"
import GameEmpresa from "../../src/components/jogo/gameEmpresa";

export const JogoContext = createContext({})

export default function Jogo() {
    const router = useRouter()
    const paginaPronta = router.isReady

    const jogosLista = useBuscarJogos()
    const dadosProntos = useAwaitLoading(jogosLista)
    const jogosListaPublic = usePublicBuscarJogos()

    // 🔄 ESTADO PARA O PARALAXE
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const jogo = jogosLista.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase())
    const jogoPublic = jogosListaPublic.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase())
    const jogoComplementaryData = jogosData.find((item) => item.nome.toLowerCase() === jogo?.nome.toLowerCase())

    if (paginaPronta && dadosProntos) {
        if (jogo) {
            return (
                <JogoContext value={{jogo, jogoComplementaryData, jogoPublic}}>

                    {/* ⚙️ NOVO CONTAINER DO PARALAXE */}
                    <div
                        className={style.heroWrapper}
                        style={{ '--parallax-offset': `${offsetY * 0.6}px` }} // 0.4 controla a velocidade do efeito
                    >
                        <img src={jogoComplementaryData.hero} className={style.hero}/>
                    </div>

                    <main className={style.container_pg}>
                        <ApresentacaoJogo/>
                        <hr className={style.divisor}/>
                        <GaleriaJogo/>
                        <hr className={style.divisor}/>
                        <EscreverAvaliacao/>
                        <hr className={style.divisor}/>
                        <TitulosSimilares
                            jogosAPI={jogosListaPublic}
                            jogosComplementares={jogosData}
                            categoriaAtual={jogoPublic.categoria}
                            nomeJogoAtual={jogo.nome}
                        />
                        <hr className={style.divisor}/>
                        <GameEmpresa/>
                    </main>
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
                <Carregamento/>
            </div>
        )
    }
}