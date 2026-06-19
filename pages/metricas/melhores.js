import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '../../src/style/pages/metricas/melhores.module.css';

// Hooks Necessários
import useBuscarJogos from '../../src/hooks/Api/protected/useBuscarJogos';
import useBuscarCategorias from '../../src/hooks/Api/protected/useBuscarCategorias';
import useBuscarEmpresas from '../../src/hooks/Api/protected/useBuscarEmpresas';
import { useRequireLogin } from '../../src/hooks/useRequireLogin';
import useAwaitLoading from '../../src/hooks/useAwaitLoading'; // 👈 Importamos o seu verificador

// Dados Complementares, Componentes e Endpoints
import { jogosData } from '../../src/data/complementaryData';
import Carregamento from '../../src/components/loading';
import { apiPath } from '../../infra/api';

export default function MelhoresAvaliados() {
    // 🎛️ Estados para os filtros e ranking
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroEmpresa, setFiltroEmpresa] = useState('');
    
    const [jogosComRanking, setJogosComRanking] = useState([]);
    const [carregandoRanking, setCarregandoRanking] = useState(true);

    // 📡 Consumo das APIs base
    const { token } = useRequireLogin();
    const reqJogos = useBuscarJogos();
    const reqCategorias = useBuscarCategorias();
    const reqEmpresas = useBuscarEmpresas();

    // 🛡️ Travas de Segurança (Evita o falso positivo de lista vazia)
    const jogosProntos = useAwaitLoading(reqJogos);
    const categoriasProntas = useAwaitLoading(reqCategorias);
    const empresasProntas = useAwaitLoading(reqEmpresas);

    // ⚙️ Motor de Busca e Ordenação
    useEffect(() => {
        // Só inicia o cálculo QUANDO TUDO estiver de fato carregado
        if (!jogosProntos || !categoriasProntas || !empresasProntas || !token) return;

        async function montarRanking() {
            setCarregandoRanking(true);

            const promessas = reqJogos.map(async (jogo) => {
                let notaMedia = 0;
                let totalAvaliacoes = 0;

                try {
                    const resposta = await fetch(`${apiPath}/avaliacoes/media/${jogo.id}`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (resposta.ok && resposta.status !== 204) {
                        const api = await resposta.json();
                        const dados = Array.isArray(api) ? api[0] : api;
                        
                        notaMedia = Number(dados?.notaMedia || dados?.media || dados?.valor || 0);
                        totalAvaliacoes = Number(dados?.totalAvaliacoes || dados?.quantidade || dados?.total || 0);
                    }
                } catch (error) {
                    console.error(`Falha ao buscar nota do jogo ${jogo.id}`);
                }

                const categoria = reqCategorias.find(c => c.id === Number(jogo.fkCategoria));
                const empresaObj = reqEmpresas.find(e => e.id === Number(jogo.fkEmpresa));
                const dadosExtra = jogosData.find(d => d.nome.toLowerCase() === jogo.nome.toLowerCase());

                return {
                    ...jogo,
                    nota: notaMedia,
                    qtdAvaliacoes: totalAvaliacoes,
                    categoriaNome: categoria?.nome || 'Desconhecida',
                    idCategoria: categoria?.id,
                    empresa: empresaObj?.nome || 'Desconhecida',
                    idEmpresa: empresaObj?.id,
                    capa: dadosExtra?.capa || '/assets/404.svg',
                };
            });

            // Dispara todas as buscas ao mesmo tempo
            const resultados = await Promise.all(promessas);

            // Ordena os resultados e atribui a posição
            const rankingOrdenado = resultados.sort((a, b) => {
                if (b.nota !== a.nota) return b.nota - a.nota; 
                return b.qtdAvaliacoes - a.qtdAvaliacoes; 
            }).map((jogo, index) => ({
                ...jogo,
                posicao: index + 1
            }));

            setJogosComRanking(rankingOrdenado);
            setCarregandoRanking(false); // Libera a tela definitivamente
        }

        montarRanking();
    }, [jogosProntos, categoriasProntas, empresasProntas, reqJogos, reqCategorias, reqEmpresas, token]);

    // 🛑 Tela de carregamento unificada
    if (!jogosProntos || !categoriasProntas || !empresasProntas || carregandoRanking) {
        return (
            <Carregamento />
        );
    }

    // ⭐ Função Auxiliar: Renderizar Estrelas Visuais
    const renderEstrelas = (nota) => {
        const notaArredondada = Math.round(Number(nota));
        const estrelasCheias = Math.max(0, Math.min(5, notaArredondada)); 
        return "★".repeat(estrelasCheias) + "☆".repeat(5 - estrelasCheias);
    };

    // 🔍 Aplicação dos Filtros
    const jogosFiltrados = jogosComRanking.filter((jogo) => {
        const matchCategoria = filtroCategoria ? jogo.idCategoria === Number(filtroCategoria) : true;
        const matchEmpresa = filtroEmpresa ? jogo.empresa?.toLowerCase() === filtroEmpresa.toLowerCase() : true;
        return matchCategoria && matchEmpresa;
    });

    return (
        <main className={style.container}>
            <Head>
                <title>Top Avaliados | Gameblog</title>
            </Head>

            <header className={style.header}>
                <h1 className={`${style.titulo} ${style.animarEntrada}`}>Mais Aclamados</h1>
                <p className={`${style.subtitulo} ${style.animarEntrada}`}>Descubra os títulos com as melhores avaliações da comunidade.</p>
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
                        {reqCategorias.map(cat => (
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
                        {reqEmpresas.map(emp => (
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
                            <div className={style.badgePosicao}>#{jogo.posicao}</div>
                            
                            <img src={jogo.capa} alt={`Capa ${jogo.nome}`} className={style.capa} />
                            
                            <div className={style.info}>
                                <h2 className={style.nomeJogo}>{jogo.nome}</h2>
                                <span className={style.empresa}>{jogo.empresa}</span>
                            </div>

                            <div className={style.keyContainer}>
                                <span className={style.keyLabel}>Nota Média</span>
                                <code className={style.keyCode} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                    <span style={{ color: '#FFD700', fontSize: '1.1rem', letterSpacing: '2px' }}>
                                        {renderEstrelas(jogo.nota)}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        ({jogo.qtdAvaliacoes})
                                    </span>
                                </code>
                            </div>
                        </Link>
                    ))}
                </section>
            )}
        </main>
    );
}