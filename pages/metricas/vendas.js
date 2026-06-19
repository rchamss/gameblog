import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '../../src/style/pages/metricas/vendas.module.css'

// Hooks
import useBuscarJogosMaisVendidos from '../../src/hooks/Api/protected/useBuscarJogosMaisVendidos';
import useBuscarCategorias from '../../src/hooks/Api/protected/useBuscarCategorias';
import useBuscarEmpresas from '../../src/hooks/Api/protected/useBuscarEmpresas';
import useBuscarJogos from '../../src/hooks/Api/protected/useBuscarJogos'

// Dados Complementares e Componentes
import {jogosData} from '../../src/data/complementaryData';
import Carregamento from '../../src/components/loading';

export default function Vendas() {
    // 🎛️ Estados para os filtros
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroEmpresa, setFiltroEmpresa] = useState('');

    // 📡 Consumo das APIs
    const maisVendidos = useBuscarJogosMaisVendidos() || [];
    const listaJogos = useBuscarJogos() || [];
    const listaCategorias = useBuscarCategorias() || [];
    const listaEmpresas = useBuscarEmpresas() || [];

    // 🛡️ Tela de carregamento enquanto aguarda as APIs
    if (!maisVendidos.length || !listaJogos.length || !listaCategorias.length || !listaEmpresas.length) {
        return <Carregamento />
        
    }

    // 🧬 Mesclagem de Dados (Junta API de Vendas + API Base + Dados Estáticos)
    const jogosCompletos = maisVendidos.map((venda, index) => {
        // Encontra o jogo na base geral para pegar a FK da Categoria e o Preço
        const jogoBase = listaJogos.find(j => j.nome.toLowerCase() === venda.nome.toLowerCase());
        
        // Encontra a categoria correspondente
        const categoria = jogoBase ? listaCategorias.find(c => c.id === Number(jogoBase.fkCategoria)) : null;
        
        // Encontra as imagens nos dados estáticos
        const dadosExtra = jogosData.find(d => d.nome.toLowerCase() === venda.nome.toLowerCase());

        return {
            ...venda,
            posicao: index + 1,
            preco: jogoBase?.preco || 0,
            categoriaNome: categoria?.nome || 'Desconhecida',
            idCategoria: categoria?.id,
            capa: dadosExtra?.capa || '/assets/404.svg',
            idJogo: jogoBase?.id
        };
    });

    // 🔍 Aplicação dos Filtros
    const jogosFiltrados = jogosCompletos.filter((jogo) => {
        const matchCategoria = filtroCategoria ? jogo.idCategoria === Number(filtroCategoria) : true;
        const matchEmpresa = filtroEmpresa ? jogo.empresa.toLowerCase() === filtroEmpresa.toLowerCase() : true;
        return matchCategoria && matchEmpresa;
    });

    return (
        <main className={style.container}>
            <Head>
                <title>Top Vendas | Gameblog</title>
            </Head>

            <header className={style.header}>
                <h1 className={`${style.titulo} ${style.animarEntrada}`}>Top 10 Mais Vendidos</h1>
                <p className={`${style.subtitulo} ${style.animarEntrada}`}>Descubra os títulos que estão dominando o mercado.</p>
            </header>

            {/* 🎛️ BARRA DE FILTROS */}
            <section className={`${style.filtrosContainer} ${style.animarEntrada}`}>
                <div className={style.filtroGrupo}>
                    <label>Categoria:</label>
                    <select 
                        value={filtroCategoria} 
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                        className={style.selectMinimalista}
                    >
                        <option value="">Todas as Categorias</option>
                        {listaCategorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                </div>

                <div className={style.filtroGrupo}>
                    <label>Empresa:</label>
                    <select 
                        value={filtroEmpresa} 
                        onChange={(e) => setFiltroEmpresa(e.target.value)}
                        className={style.selectMinimalista}
                    >
                        <option value="">Todas as Empresas</option>
                        {listaEmpresas.map(emp => (
                            <option key={emp.id} value={emp.nome}>{emp.nome}</option>
                        ))}
                    </select>
                </div>
            </section>

            {/* 🎮 GRID DE JOGOS */}
            {jogosFiltrados.length === 0 ? (
                <div className={style.vazioContainer}>
                    <h2>Nenhum jogo encontrado com esses filtros.</h2>
                    <button onClick={() => {setFiltroCategoria(''); setFiltroEmpresa('');}} className={style.botaoLimpar}>
                        Limpar Filtros
                    </button>
                </div>
            ) : (
                <section className={style.grid}>
                    {jogosFiltrados.map((jogo, index) => (
                        <Link 
                            href={`/jogo/${jogo.nome}`} 
                            key={jogo.nome} 
                            className={`${style.card} ${style.animacaoEntrada}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Ranking Badge */}
                            <div className={style.badgePosicao}>#{jogo.posicao}</div>
                            
                            <img src={jogo.capa} alt={`Capa ${jogo.nome}`} className={style.capa} />
                            
                            <div className={style.info}>
                                <h2 className={style.nomeJogo}>{jogo.nome}</h2>
                                <span className={style.empresa}>{jogo.empresa}</span>
                                
                                <div className={style.detalhesAbaixo}>
                                    <span className={style.categoria}>{jogo.categoriaNome}</span>
                                    <span className={style.vendasTotal}>{jogo.total} Unidades Vendidas</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            )}
        </main>
    );
}