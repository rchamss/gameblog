import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRequireLogin } from "../src/hooks/useRequireLogin";
import useBuscarMeusJogos from "../src/hooks/Api/protected/useBuscarMeusJogos"; 
import { jogosData } from "../src/data/complementaryData"; 
import styles from "../src/style/pages/biblioteca.module.css"; 

export default function Biblioteca() {
    useRequireLogin();

    const router = useRouter();
    const { meusJogos, buscarMeusJogos, carregando } = useBuscarMeusJogos();

    // 🔄 ESTADOS DA PÁGINA
    const [offsetY, setOffsetY] = useState(0);
    const [heroDestaque, setHeroDestaque] = useState(null); // 👈 Guarda a imagem sorteada

    useEffect(() => {
        buscarMeusJogos();
    }, [buscarMeusJogos]);

    // 🎲 EFFECT DO SORTEIO (Roda apenas quando meusJogos for atualizado pela API)
    useEffect(() => {
        if (meusJogos.length > 0) {
            // 1. Cruza a biblioteca do usuário com o jogosData e filtra apenas os que têm 'hero'
            const jogosComHero = meusJogos
                .map((item) => jogosData.find((j) => j.nome === item.jogo.nome))
                .filter((data) => data && data.hero);

            // 2. Se encontrou jogos com hero, sorteia um índice aleatório
            if (jogosComHero.length > 0) {
                const indiceSorteado = Math.floor(Math.random() * jogosComHero.length);
                setHeroDestaque(jogosComHero[indiceSorteado].hero);
            }
        }
    }, [meusJogos]);

    // 🔄 EFFECT DO SCROLL (Paralaxe)
    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleRedirecionarJogo = (nomeJogo) => {
        router.push(`/jogo/${nomeJogo}`);
    };

    const getCapaUrl = (nomeJogo) => {
        const jogoInfo = jogosData.find((j) => j.nome === nomeJogo);
        return jogoInfo && jogoInfo.capa ? jogoInfo.capa : '/assets/404.svg';
    };

    return (
        <main className={styles.container}>
            {/* ⚙️ CONTAINER DO PARALAXE (Agora usa o estado heroDestaque) */}
            {heroDestaque && (
                <div
                    className={styles.heroWrapper}
                    style={{ '--parallax-offset': `${offsetY * 0.6}px` }} 
                >
                    <img src={heroDestaque} className={styles.hero}/>
                </div>
            )}

            {/* CONTEÚDO DA PÁGINA */}
            <div className={styles.conteudoPrincipal}>
                <div className={styles.header}>
                    <h1 className={styles.titulo}>Minha Biblioteca</h1>
                    <span className={styles.subtitulo}>Seus jogos adquiridos e chaves de ativação.</span>
                </div>

                {carregando ? (
                    <div className={styles.loading}>
                        <h2>Carregando sua biblioteca...</h2>
                    </div>
                ) : meusJogos.length === 0 ? (
                    <div className={styles.loading}>
                        <h2>Você ainda não possui nenhum jogo adquirido.</h2>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {meusJogos.map((item, index) => (
                            <div 
                                key={item.chaveAtivacao || index} 
                                className={styles.card}
                            >
                                <div 
                                    className={styles.clickArea} 
                                    onClick={() => handleRedirecionarJogo(item.jogo.nome)}
                                >
                                    <img 
                                        src={getCapaUrl(item.jogo.nome)} 
                                        alt={`Capa do jogo ${item.jogo.nome}`} 
                                        className={styles.capa}
                                        onError={(e) => { e.target.src = '/assets/404.svg' }}
                                    />
                                    <h2 className={styles.nomeJogo}>{item.jogo.nome}</h2>
                                </div>
                                
                                <div className={styles.keyContainer}>
                                    <span className={styles.keyLabel}>Chave</span>
                                    <code className={styles.keyCode}>{item.chaveAtivacao}</code>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}