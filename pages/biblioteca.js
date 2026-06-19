import { useRouter } from "next/router";
import { useRequireLogin } from "../src/hooks/useRequireLogin";
import useBuscarJogos from "../src/hooks/Api/useBuscarJogos"; 
import { jogosData } from "../src/data/complementaryData"; 
import styles from "../src/style/pages/biblioteca.module.css"; 

export default function Biblioteca() {
    useRequireLogin();

    const router = useRouter();
    const jogos = useBuscarJogos();

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
                <p className={styles.subtitulo}>Seus jogos adquiridos aparecem aqui.</p>
            </div>

            {jogos.length === 0 ? (
                <div className={styles.loading}>
                    <h2>Carregando sua biblioteca...</h2>
                </div>
            ) : (
                <div className={styles.grid}>
                    {jogos.map((jogo) => (
                        <div 
                            key={jogo.id} 
                            className={styles.card}
                            onClick={() => handleRedirecionarJogo(jogo.nome)}
                        >
                            <img 
                                src={getCapaUrl(jogo.nome)} 
                                alt={`Capa do jogo ${jogo.nome}`} 
                                className={styles.capa}
                                onError={(e) => { e.target.src = '/assets/404.svg' }}
                            />
                            <h2 className={styles.nomeJogo}>{jogo.nome}</h2>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}