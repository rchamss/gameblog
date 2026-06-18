import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { EmpresaContext } from '../../../pages/empresa/[id]';
import { jogosData } from '../../data/complementaryData';
import style from '../../style/components/jogo/gameSimilares.module.css';

export default function EmpresaJogos() {
    const { empresa, lista_jogos_public } = useContext(EmpresaContext);
    const [jogosDaEmpresa, setJogosDaEmpresa] = useState([]);

    useEffect(() => {

        if (!empresa || !lista_jogos_public) return;

        const filtrados = lista_jogos_public.filter(
            (jogo) => jogo.empresa_nome?.toLowerCase() === empresa.nome.toLowerCase()
        );

        const catalogoComCapas = filtrados.map((jogoApi) => {
            const dadosExtra = jogosData.find(
                (comp) => comp.nome.toLowerCase() === jogoApi.nome.toLowerCase()
            );

            return {
                ...jogoApi,
                capa: dadosExtra?.capa || 'https://placehold.co/600x900/2D2D2D/ffffff.png?text=Sem+Capa'
            };
        });

        setJogosDaEmpresa(catalogoComCapas);
    }, [empresa, lista_jogos_public]);

    // Se a empresa ainda não tiver jogos registrados, não renderiza a sessão
    if (jogosDaEmpresa.length === 0) return null;

    return (
        <section className={style.container}>
            <h2 className={style.title}>Jogos Publicados</h2>
            <div className={style.grid}>
                {jogosDaEmpresa.map((jogo) => (
                    <Link href={`/jogo/${encodeURIComponent(jogo.nome)}`} key={jogo.nome} className={style.card}>
                        <img src={jogo.capa} alt={`Capa do jogo ${jogo.nome}`} className={style.capa} />
                    </Link>
                ))}
            </div>
        </section>
    );
}