import React, { useId } from "react";

const StarDisplay = ({ index, value, tamanho }) => {
    const idUnico = useId();
    const gradientId = `star-gradient-${idUnico}-${index}`;

    let fillPercent = 0;
    if (value >= index) {
        fillPercent = 100;
    } else if (value > index - 1) {
        fillPercent = (value - (index - 1)) * 100;
    }

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={tamanho}
            height={tamanho}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset={`${fillPercent}%`} stopColor="var(--cor-primaria)" stopOpacity="1" />
                    <stop offset={`${fillPercent}%`} stopColor="var(--cor-primaria)" stopOpacity="1" />
                </linearGradient>
            </defs>
            <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`url(#${gradientId})`}
            />
        </svg>
    );
};

export default function GameAvaliacoes({ nota, quantidadeAvaliacoes, tamanho = 24 }) {
    const notaSegura = Math.max(0, Math.min(5, Number(nota) || 0));
    const totalAvaliacoes = Number(quantidadeAvaliacoes) || 0;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <StarDisplay
                        key={index}
                        index={index}
                        value={notaSegura}
                        tamanho={tamanho}
                    />
                ))}
            </div>

            <div style={{ color: 'var(--cor-primaria)', fontSize: '0.95rem' }}>
                <strong>{notaSegura.toFixed(1)}</strong>
                <span style={{ opacity: 0.7, marginLeft: '6px', fontSize: '0.85rem' }}>
                    ({totalAvaliacoes} {totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'})
                </span>
            </div>
        </div>
    );
}