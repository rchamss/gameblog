import React, { useEffect, useRef } from "react";
import useBuscarCategorias from "../src/hooks/Api/protected/useBuscarCategorias";
import Link from "next/link";
import styles from "../src/style/components/categorias/categorias.module.css";
import { categoriasData } from "../src/data/complementaryDataCategorias";
import useAwaitLoading from "../src/hooks/useAwaitLoading";
import Carregamento from "../src/components/loading";
import Head from "next/head";

export default function Categorias() {
    const categorias = useBuscarCategorias();
    
    // Garante que listaSegura sempre seja um array válido
    const listaSegura = Array.isArray(categorias) ? categorias : (categorias?.data || []);
    const dadosProntos = useAwaitLoading(listaSegura);

    // 🎯 Ref para guardar todos os elementos que precisam ser observados na rolagem
    const elementosRef = useRef([]);

    const obterImagemDaCategoria = (nomeCategoria) => {
        if (!nomeCategoria) return "https://placehold.co/960x310/2D2D2D/ffffff.png?text=Gameblog";

        const limparString = (str) =>
            str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const categoriaEncontrada = categoriasData.find(
            (cat) => limparString(cat.nome) === limparString(nomeCategoria)
        );

        return categoriaEncontrada?.imagemCapa || `https://placehold.co/960x310/01569A/ffffff.png?text=${encodeURIComponent(nomeCategoria)}`;
    };

    // 👁️ Lógica de Observação de Tela (Intersection Observer)
    useEffect(() => {
        if (!dadosProntos) return;

        let entradasEmLote = [];
        let timerLote = null;

        const observer = new IntersectionObserver((entries) => {
            // 1. Filtra apenas os elementos que realmente entraram na tela
            const elementosVisiveis = entries.filter(entry => entry.isIntersecting);
            
            if (elementosVisiveis.length > 0) {
                // Coloca na fila de processamento
                entradasEmLote.push(...elementosVisiveis);
                
                // Já desativa a observação para não repetir
                elementosVisiveis.forEach(entry => observer.unobserve(entry.target));

                // 2. Cria uma "janela" de 50ms para agrupar tudo que apareceu ao mesmo tempo
                if (!timerLote) {
                    timerLote = setTimeout(() => {
                        // 3. Ordena os cards pela posição real deles na tela (data-index)
                        entradasEmLote.sort((a, b) => {
                            const indexA = Number(a.target.getAttribute('data-index'));
                            const indexB = Number(b.target.getAttribute('data-index'));
                            return indexA - indexB;
                        });

                        // 4. Aplica a animação com o delay correto em escadinha
                        entradasEmLote.forEach((entry, i) => {
                            entry.target.style.setProperty('--delay-entrada', `${i * 0.08}s`);
                            entry.target.classList.remove(styles.oculto);
                            entry.target.classList.add(styles.animarEntrada);
                        });

                        // Limpa o lote para a próxima rolagem
                        entradasEmLote = [];
                        timerLote = null;
                    }, 50);
                }
            }
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px 50px 0px" 
        });

        elementosRef.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
            if (timerLote) clearTimeout(timerLote);
        };
    }, [dadosProntos, listaSegura]);

    if (dadosProntos) {
        return (
            <main className={styles.container}>
                <Head>
                    <title>Categorias | Gameblog</title>
                </Head>
                
                <h2 className={styles.title}>Tipos de Jogos</h2>

                <div className={styles.grid}>
                    {listaSegura.length > 0 ? (
                        listaSegura.map((item, index) => {
                            const imagemFundo = obterImagemDaCategoria(item.nome);

                            return (
                                /* 👇 Adicionamos o data-index={index} aqui */
                                <div
                                    key={item.id}
                                    ref={el => elementosRef.current[index] = el}
                                    className={styles.oculto}
                                    data-index={index} 
                                >
                                    <Link
                                        href={`/categoria/${encodeURIComponent(item.nome)}`}
                                        className={styles.card}
                                        style={{ backgroundImage: `url(${imagemFundo})` }}
                                    >
                                        <div className={styles.overlay}></div>
                                        <span className={styles.cardName}>{item.nome}</span>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <p className={styles.loadingText}>Carregando categorias...</p>
                    )}
                </div>

                <h2 className={styles.title}>Outras Categorias</h2>

                {/* 👇 Adicionamos o data-index correspondente ao final da fila aqui também */}
                <div
                    ref={el => elementosRef.current[listaSegura.length] = el}
                    className={styles.oculto}
                    data-index={listaSegura.length}
                    style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    <Link href={'/empresas'} className={styles.cardOther}>
                        <span className={styles.cardName}>Empresas</span>
                    </Link>
                    <Link href={'/metricas/vendas'} className={styles.cardOther}>
                        <span className={styles.cardName}>Jogos mais vendidos</span>
                    </Link>
                    <Link href={'/metricas/melhores'} className={styles.cardOther}>
                        <span className={styles.cardName}>Melhores Jogos</span>
                    </Link>
                </div>

                <div className={styles.grid}></div>
            </main>
        );
    }}