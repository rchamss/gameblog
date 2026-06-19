import style from "../../src/style/pages/jogo/[id].module.css"
import Carregamento from "../../src/components/loading";
import { useRouter } from "next/router"
import { jogosData } from "../../src/data/complementaryData";
import { createContext, useEffect, useState } from "react"; 
import useAwaitLoading from "../../src/hooks/useAwaitLoading";
import ApresentacaoJogo from "../../src/components/jogo/ApresentacaoJogo";
import { useRequireLogin } from "../../src/hooks/useRequireLogin";
import useBuscarJogos from "../../src/hooks/Api/protected/useBuscarJogos";
import usePublicBuscarJogos from "../../src/hooks/Api/useBuscarJogos";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const GaleriaJogo = dynamic(() => import("../../src/components/jogo/GaleriaJogo"), { ssr: false });
const EscreverAvaliacao = dynamic(() => import("../../src/components/jogo/gameCreateAvaliacao"), { ssr: false });
const TitulosSimilares = dynamic(() => import("../../src/components/jogo/gameSimilares"), { ssr: false });
const GameEmpresa = dynamic(() => import("../../src/components/jogo/gameEmpresa"), { ssr: false });

export const JogoContext = createContext({})

function LazySection({ children }) {
    const { ref, inView } = useInView({
        triggerOnce: true, 
        // 👇 Aumentado para 1500px: Carrega muito antes do usuário chegar perto
        rootMargin: "1500px 0px", 
    });

    return (
        <div ref={ref} style={{ minHeight: "200px" }}>
            {inView ? children : null}
        </div>
    );
}

export default function Jogo() {
    const router = useRouter()
    const paginaPronta = router.isReady

    const jogosLista = useBuscarJogos()
    const dadosProntos = useAwaitLoading(jogosLista)
    const jogosListaPublic = usePublicBuscarJogos()

    const [offsetY, setOffsetY] = useState(0);
    // 👇 Novos estados para controlar a transição suave do loading
    const [renderizarSite, setRenderizarSite] = useState(false);
    const [ocultarLoading, setOcultarLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 👇 Efeito que constrói o DOM em segundo plano antes de tirar a tela de loading
    useEffect(() => {
        if (paginaPronta && dadosProntos) {
            setRenderizarSite(true); // 1. Renderiza o HTML por trás do loading
            
            // 2. Dá 600ms para o navegador baixar imagens e processar CSS sem engasgar
            setTimeout(() => {
                setOcultarLoading(true); // 3. Tira a tela de loading com fade-out
            }, 600);
        }
    }, [paginaPronta, dadosProntos]);

    const jogo = jogosLista.find((item) => item.nome.toLowerCase() === router.query.id?.toLowerCase())
    const jogoPublic = jogosListaPublic.find((item) => item.nome.toLowerCase() === router.query.id?.toLowerCase())
    const jogoComplementaryData = jogosData.find((item) => item.nome.toLowerCase() === jogo?.nome.toLowerCase())

    // Tela de Erro 404 (Sobe imediatamente se a API carregou e não achou o jogo)
    if (renderizarSite && !jogo) {
        return (
            <main className={style.notFound}>
                <div className={style.iconeContainer}>
                    <img src="/assets/404.svg" alt="Não encontrado"/>
                </div>
                <h1>Oops!</h1>
                <p>Não encontramos nada aqui. Tem certeza que veio no lugar certo?</p>
            </main>
        )
    }

    return (
        <>
            {/* 🛑 TELA DE LOADING OVERLAY (Fica por cima até ocultarLoading ser true) */}
            {!ocultarLoading && (
                <div className={`${style.container_carregamento} ${renderizarSite ? style.fadeOut : ''}`}>
                    <Carregamento/>
                </div>
            )}

            {/* 🟢 CONTEÚDO DO SITE (Renderiza silenciosamente atrás do loading) */}
            {renderizarSite && jogo && (
                <JogoContext.Provider value={{jogo, jogoComplementaryData, jogoPublic}}>
                    <div
                        className={style.heroWrapper}
                        style={{ '--parallax-offset': `${offsetY * 0.6}px` }} 
                    >
                        <img src={jogoComplementaryData.hero} className={style.hero} alt="Hero do jogo"/>
                    </div>

                    <main className={style.container_pg}>
                        <ApresentacaoJogo/>
                        <hr className={style.divisor}/>
                        
                        <LazySection><GaleriaJogo/></LazySection>
                        <hr className={style.divisor}/>
                        
                        <LazySection><EscreverAvaliacao/></LazySection>
                        <hr className={style.divisor}/>
                        
                        <LazySection>
                            <TitulosSimilares
                                jogosAPI={jogosListaPublic}
                                jogosComplementares={jogosData}
                                categoriaAtual={jogoPublic.categoria}
                                nomeJogoAtual={jogo.nome}
                            />
                        </LazySection>
                        <hr className={style.divisor}/>
                        
                        <LazySection><GameEmpresa/></LazySection>
                    </main>
                </JogoContext.Provider>
            )}
        </>
    );
}