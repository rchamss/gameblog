import { useState } from "react";
import style from "../../style/components/perfil/editarPerfil.module.css";

import useBuscarAvaliacoesUser from "../../hooks/Api/protected/useBuscarAvalicacaoUser";
import useBuscarJogos from "../../hooks/Api/protected/useBuscarJogos";

export default function Avaliacoes() {
    const [ativo, setAtivo] = useState(false);

    // 📡 Consumo das APIs
    const avaliacoes = useBuscarAvaliacoesUser() || [];
    const listaJogos = useBuscarJogos() || [];

    // ⭐ Função para renderizar as estrelas
    const renderEstrelas = (nota) => {
        const notaArredondada = Math.round(Number(nota));
        const estrelasCheias = Math.max(0, Math.min(5, notaArredondada));
        return "★".repeat(estrelasCheias) + "☆".repeat(5 - estrelasCheias);
    };

    return (
        <section className={`${style.background} ${ativo ? style.aberto : style.fechado}`}>
            <h1 onClick={() => setAtivo(!ativo)} style={{ cursor: 'pointer' }}>
                Minhas Avaliações
            </h1>

            <div className={style.conteudoAnimado}>
                {avaliacoes.length === 0 && listaJogos.length === 0 ? (
                    <p>Carregando avaliações...</p>
                ) : avaliacoes.length === 0 ? (
                    <p>Você ainda não avaliou nenhum jogo.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                        {avaliacoes.map((avaliacao) => {
                            // Encontra o jogo correspondente usando a Chave Estrangeira (fkJogo)
                            const jogoEncontrado = listaJogos.find((j) => j.id === Number(avaliacao.fkJogo));
                            const nomeJogo = jogoEncontrado ? jogoEncontrado.nome : "Jogo Desconhecido";

                            return (
                                <article 
                                    key={avaliacao.id} 
                                    style={{ 
                                        borderBottom: '1px solid rgba(255,255,255,0.1)', 
                                        paddingBottom: '10px' 
                                    }}
                                >
                                    {/* Cabeçalho da Avaliação: Nome e Estrelas */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <strong>
                                            {nomeJogo}
                                        </strong>
                                        
                                        <div>
                                            <span>
                                                {renderEstrelas(avaliacao.nota)}
                                            </span>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted, #94a3b8)', fontWeight: 'bold' }}>
                                                ({avaliacao.nota})
                                            </span>
                                        </div>
                                    </div>

                                    {/* Comentário Condicional */}
                                    {avaliacao.comentario && (
                                        <p>
                                            "{avaliacao.comentario}"
                                        </p>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}