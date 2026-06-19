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
import Head from "next/head";

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
    const categoriasProntos = useAwaitLoading(jogosListaPublic)

    const [offsetY, setOffsetY] = useState(0);
    const [renderizarSite, setRenderizarSite] = useState(false);
    const [ocultarLoading, setOcultarLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ⏳ Controle do fluxo de Loading
    useEffect(() => {
        // Agora verificamos se TODAS as listas essenciais terminaram de carregar
        if (paginaPronta && dadosProntos && categoriasProntos) {
            setRenderizarSite(true); 
            
            setTimeout(() => {
                setOcultarLoading(true); 
            }, 600);
        }
    }, [paginaPronta, dadosProntos, categoriasProntos]);

    // 🛡️ PROTEÇÃO CONTRA CRASHES: Extração segura de dados
    let jogo = null;
    let jogoPublic = null;
    let jogoComplementaryData = null;

    // Só tenta ler as propriedades do jogo se os dados já chegaram
    if (dadosProntos && categoriasProntos && router.query.id) {
        jogo = jogosLista?.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase());
        jogoPublic = jogosListaPublic?.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase());
        
        if (jogo) {
            // Só faz o toLowerCase se tiver certeza absoluta que 'jogo' existe
            jogoComplementaryData = jogosData.find((item) => item.nome.toLowerCase() === jogo.nome.toLowerCase());
        }
    }

    // ❌ TELA 404 (Renderiza se acabou de carregar tudo, mas não achou o jogo)
    if (renderizarSite && !jogo) {
        return (
            <main className={style.notFound}>
                <div className={style.iconeContainer}>
                    <img src="/assets/404.svg" alt="Erro 404"/>
                </div>
                <h1>Oops!</h1>
                <p>Não encontramos nada aqui. Tem certeza que veio no lugar certo?</p>
            </main>
        )
    }

    return (
        <>
            {/* 🛑 COMPONENTE DE CARREGAMENTO (Fica por cima de tudo) */}
            {!ocultarLoading && (
                <div className={`${style.container_carregamento} ${renderizarSite ? style.fadeOut : ''}`}>
                    <Carregamento />
                </div>
            )}

            {/* 🟢 CONTEÚDO PRINCIPAL (Renderizado silenciosamente) */}
            {renderizarSite && jogo && jogoPublic && jogoComplementaryData && (
                <JogoContext.Provider value={{jogo, jogoComplementaryData, jogoPublic}}>
                    <Head>
                        <title>{jogo.nome}</title>
                    </Head>
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