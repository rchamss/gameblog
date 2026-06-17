import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from '../../style/components/jogo/gameSimilares.module.css';

export default function TitulosSimilares({ jogosAPI, jogosComplementares, categoriaAtual, nomeJogoAtual }) {
    const [jogosRecomendados, setJogosRecomendados] = useState([]);

    useEffect(() => {
        // Trava de segurança para garantir que os dados existem
        if (!jogosAPI || !jogosComplementares || !categoriaAtual) return;

        // 1. Filtra os jogos da mesma categoria, excluindo o jogo que o usuário já está vendo
        const filtrados = jogosAPI.filter(
            (jogo) => jogo.categoria === categoriaAtual && jogo.nome !== nomeJogoAtual
        );

        // 2. Embaralha a lista aleatoriamente
        const embaralhados = [...filtrados].sort(() => Math.random() - 0.5);

        // 3. Pega no máximo os 5 primeiros e busca a capa correspondente na lista complementar
        const selecionados = embaralhados.slice(0, 5).map((jogoApi) => {
            const dadosExtra = jogosComplementares.find(
                (comp) => comp.nome.toLowerCase() === jogoApi.nome.toLowerCase()
            );

            return {
                ...jogoApi,
                capa: dadosExtra?.capa || 'https://placehold.co/600x900/2D2D2D/ffffff.png?text=Sem+Capa'
            };
        });

        setJogosRecomendados(selecionados);
    }, [jogosAPI, jogosComplementares, categoriaAtual, nomeJogoAtual]);

    // Regra de negócio: Se não houver nenhum jogo similar, o componente desaparece
    if (jogosRecomendados.length === 0) return null;

    return (
        <section className={style.container}>
            <h2 className={style.title}>Títulos Similares</h2>
            <div className={style.grid}>
                {jogosRecomendados.map((jogo) => (
                    <Link href={`/jogo/${encodeURIComponent(jogo.nome)}`} key={jogo.nome} className={style.card}>
                        <img src={jogo.capa} alt={`Capa do jogo ${jogo.nome}`} className={style.capa} />
                    </Link>
                ))}
            </div>
        </section>
    );
}