import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRequireLogin } from "../src/hooks/useRequireLogin";
import useBuscarMeusJogos from "../src/hooks/Api/protected/useBuscarMeusJogos"; 
import { jogosData } from "../src/data/complementaryData"; 
import styles from "../src/style/pages/biblioteca.module.css"; 

export default function Biblioteca() {
    useRequireLogin();

    const router = useRouter();
    const { meusJogos, buscarMeusJogos, carregando } = useBuscarMeusJogos();

    useEffect(() => {
        buscarMeusJogos();
    }, [buscarMeusJogos]);

    const handleRedirecionarJogo = (nomeJogo) => {
        router.push(`/jogo/${nomeJogo}`);
    };

    const getCapaUrl = (nomeJogo) => {
        const jogoInfo = jogosData.find((j) => j.nome === nomeJogo);
        return jogoInfo && jogoInfo.capa ? jogoInfo.capa : '/assets/404.svg';
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.titulo}>Minha Biblioteca</h1>
                <p className={styles.subtitulo}>Seus jogos adquiridos e chaves de ativação.</p>
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
        </main>
    );
}