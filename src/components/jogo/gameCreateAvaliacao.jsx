import style from '../../style/components/jogo/gameCreateAvaliacao.module.css';
import { useState, useContext, useRef } from "react";
import { JogoContext } from "../../../pages/jogo/[id]";
import SubmitButton from "../submitButton";
import useAddAvaliacao from "../../hooks/Api/protected/useAddAvaliacao";

// Componente auxiliar para renderizar uma única estrela com suporte a preenchimento parcial
const Star = ({ index, value, onHover, onClick, onLeave }) => {
    const starRef = useRef(null);

    // Lógica para determinar o preenchimento exato desta estrela específica
    // (0 = vazia, 0.5 = metade, 1 = cheia)
    let fillAmount = 0;
    if (value >= index) {
        fillAmount = 1; // Cheia
    } else if (value >= index - 0.5) {
        fillAmount = 0.5; // Metade
    }

    // Identificador único para o gradiente desta estrela
    const gradientId = `star-gradient-${index}`;

    // Detecta a posição do mouse dentro da estrela para decidir se é 0.5 ou 1.0
    const handleMouseMove = (event) => {
        if (!starRef.current) return;
        const { left, width } = starRef.current.getBoundingClientRect();
        const percent = (event.clientX - left) / width;

        // Se o mouse estiver na metade esquerda, é meia estrela; na direita, estrela cheia.
        const newValue = percent <= 0.5 ? index - 0.5 : index;
        onHover(newValue);
    };

    return (
        <svg
            ref={starRef}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="40"
            height="40"
            className={style.estrelaInterativa}
            onMouseMove={handleMouseMove}
            onClick={() => onClick(value)} // O valor do hover atual se torna a nota fixa
            onMouseLeave={onLeave}
            role="radio"
            aria-checked={value >= index - 0.5}
            tabIndex={0}
        >
            <defs>
                {/* Definição do Gradiente Dinâmico */}
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    {/* Parte Preenchida (Branca) */}
                    <stop offset={`${fillAmount * 100}%`} stopColor="#ffffff" stopOpacity="1" />
                    {/* Parte Vazia (Cinza) - Começa exatamente onde a branca termina */}
                    <stop offset={`${fillAmount * 100}%`} stopColor="#6c757d" stopOpacity="1" />
                </linearGradient>
            </defs>

            {/* O path utiliza o gradiente definido acima como preenchimento */}
            <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`url(#${gradientId})`}
            />
        </svg>
    );
};

export default function EscreverAvaliacao() {
    const { jogo } = useContext(JogoContext)

    // Estados agora aceitam floats (0, 0.5, 1.0, ..., 5.0)
    const [nota, setNota] = useState(0);
    const [hoverNota, setHoverNota] = useState(0);
    const [comentario, setComentario] = useState("");
    const { enviarAvaliacao } = useAddAvaliacao();

    const activeValue = hoverNota || nota;

    return (
        <section className={style.escreverContainer}>
            <header className={style.escreverHeader}>
                <h2>Escrever Avaliação</h2>
            </header>

            <div className={style.escreverBody}>
                {/* Sistema de Estrelas Interativas com suporte a meio ponto */}
                <div
                    className={style.estrelasInterativas}
                    role="radiogroup"
                    aria-label={`Escolha uma nota de 0 a 5. Nota atual selecionada: ${nota}`}
                >
                    {[1, 2, 3, 4, 5].map((index) => (
                        <Star
                            key={index}
                            index={index}
                            value={activeValue} // Passa o valor ativo (hover ou fixo)
                            onHover={setHoverNota}
                            onClick={setNota}
                            onLeave={() => setHoverNota(0)}
                        />
                    ))}
                    {/* Opcional: Exibir a nota numericamente para feedback */}

                </div>
                <span className={style.notaNumericaFeedback}>{activeValue.toFixed(1)}</span>
                <textarea
                    className={style.textareaComentario}
                    placeholder="Escreva o que achou do jogo..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={6}
                />
            </div>
            <div className={style.SubmitButton}>
                <SubmitButton type={'submit'} label={'Comentar!'} action={() => enviarAvaliacao(jogo.id, nota, comentario)}/>
            </div>
        </section>
    );
}