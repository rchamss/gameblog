import style from '../../style/components/jogo/gameAvaliacoes.module.css'
import { useContext } from "react";
import { JogoContext } from "../../../pages/jogo/[id]";

// Subcomponente que suporta estrelas inteiras, meias e vazias
const StarRating = ({ media }) => {
    const estrelas = [];

    for (let i = 1; i <= 5; i++) {
        // Se a média for maior ou igual ao índice atual, a estrela está cheia
        if (media >= i) {
            estrelas.push({ id: i, tipo: 'full', caractere: '★' });
        }
        // Se estiver entre o índice anterior e o atual (ex: 4.25 ou 4.5), exibe meia estrela
        else if (media > i - 1 && media < i) {
            estrelas.push({ id: i, tipo: 'half', caractere: '½' }); // Ou use um SVG de meia-estrela
        }
        // Caso contrário, a estrela está vazia
        else {
            estrelas.push({ id: i, tipo: 'empty', caractere: '☆' });
        }
    }

    return (
        <div
            className={style.starsWrapper}
            role="img"
            aria-label={`Avaliação: ${media} de 5 estrelas`}
        >
            {estrelas.map((estrela) => (
                <span
                    key={estrela.id}
                    aria-hidden="true"
                    className={`${style.star} ${style[estrela.tipo]}`}
                >
                    {estrela.caractere}
                </span>
            ))}
        </div>
    );
};

export default function GameAvaliacoes() {
    const { jogo, jogoComplementaryData, jogoPublic } = useContext(JogoContext);

    // Extração dos dados da API de dentro do objeto do Contexto
    // Substitua 'jogo?.dadosAvaliacao' pelo caminho real onde guardou o JSON da API
    const dadosDados = jogo?.dadosAvaliacao || { media: 0, totalAvaliacoes: 0 };
    const { media, totalAvaliacoes } = dadosDados;

    return (
        <section className={style.avaliacoesContainer}>
            <div className={style.ratingHeader}>
                <StarRating media={media} />
                <span className={style.ratingText}>
                    {media.toFixed(1)} ({totalAvaliacoes} avaliações)
                </span>
            </div>

            {/* Opcional: Renderizar a lista de avaliações aqui se necessário */}
        </section>
    );
}