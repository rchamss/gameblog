import style from "../../src/style/pages/empresa/[id].module.css" // Reutilizamos o CSS da página do jogo para manter a consistência
import Carregamento from "../../src/components/loading";
import { useRouter } from "next/router"
import { jogosData } from "../../src/data/complementaryData";
import { createContext, useEffect, useState } from "react";
import useAwaitLoading from "../../src/hooks/useAwaitLoading";
import useBuscarJogos from "../../src/hooks/Api/protected/useBuscarJogos";
import usePublicBuscarJogos from "../../src/hooks/Api/useBuscarJogos";
import useBuscarEmpresas from "../../src/hooks/Api/protected/useBuscarEmpresas";
import EmpresaJogos from "../../src/components/empresa/empresaJogos";

export const EmpresaContext = createContext({})

export default function Empresa() {
    const router = useRouter()
    const paginaPronta = router.isReady

    const lista_jogos = useBuscarJogos()
    const lista_jogos_public = usePublicBuscarJogos()
    const lista_empresas = useBuscarEmpresas()
    const dadosProntos = useAwaitLoading(lista_empresas)

    // 🔄 ESTADOS PARA O PARALAXE E IMAGEM DE FUNDO
    const [offsetY, setOffsetY] = useState(0);
    const [heroImage, setHeroImage] = useState(null);

    // Efeito de rolagem para o paralaxe
    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const empresa = lista_empresas.find((empresa) => empresa.nome.toLowerCase() === router.query.id?.toLowerCase())

    useEffect(() => {
        if (empresa && lista_jogos_public.length > 0) {
            const jogosDaEmpresa = lista_jogos_public.filter(
                (jogo) => jogo.empresa_nome?.toLowerCase() === empresa.nome.toLowerCase()
            );

            // 2. Procura as imagens 'hero' correspondentes no jogosData
            const imagensDisponiveis = jogosDaEmpresa.map((jogo) => {
                const dadosExtra = jogosData.find(
                    (data) => data.nome.toLowerCase() === jogo.nome.toLowerCase()
                );
                return dadosExtra?.hero; // Retorna a URL ou undefined
            }).filter(Boolean); // Remove os nulos/indefinidos caso algum jogo não tenha imagem

            if (imagensDisponiveis.length > 0) {
                const indiceAleatorio = Math.floor(Math.random() * imagensDisponiveis.length);
                setHeroImage(imagensDisponiveis[indiceAleatorio]);
            } else {
                // imagem de reserva caso a empresa ainda não tenha jogos com imagem
                setHeroImage("https://placehold.co/1920x1080/2D2D2D/ffffff.png?text=Sem+Imagem");
            }
        }
    }, [empresa, lista_jogos_public]);

    if (paginaPronta && dadosProntos) {
        if (empresa) {
            return (
                <EmpresaContext value={{empresa, lista_jogos_public, lista_jogos}}>

                    {heroImage && (
                        <div
                            className={style.heroWrapper}
                            style={{ '--parallax-offset': `${offsetY * 0.4}px` }}
                        >
                            <img src={heroImage} className={style.hero} alt={`Fundo da empresa ${empresa.nome}`} />
                        </div>
                    )}

                    {/* CONTEÚDO PRINCIPAL SOBREPOSTO */}
                    <main className={style.container_pg}>
                        <div style={{ marginTop: '25vh', textAlign: 'center', zIndex: 2, position: 'relative' }}>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--cor-primaria, #ffffff)', textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
                                {empresa.nome}
                            </h1>
                            <p style={{ color: '#e0e0e0', fontSize: '1.2rem', marginTop: '10px', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                                Explorar o catálogo de jogos da {empresa.nome}.
                            </p>
                        </div>
                        <section className={style.container_catalogo}>
                            <EmpresaJogos/>
                        </section>
                    </main>
                </EmpresaContext>
            )
        }
        else {
            return (
                <main className={style.notFound}>
                    <div className={style.iconeContainer}>
                        <img src="/assets/404.svg" alt="Erro 404"/>
                    </div>
                    <h1>Oops!</h1>
                    <p>Não encontramos nada aqui. Tem a certeza de que veio ao lugar certo?</p>
                </main>
            )
        }
    }
    else {
        return (
            <div className={style.container_carregamento}>
                <Carregamento/>
            </div>
        )
    }
}