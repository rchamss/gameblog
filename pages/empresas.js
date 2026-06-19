import styles from "../src/style/pages/empresas.module.css";
import useBuscarEmpresas from "../src/hooks/Api/protected/useBuscarEmpresas";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Head from "next/head";

export default function Distribuir() {
    const empresas = useBuscarEmpresas();
    const listaSegura = Array.isArray(empresas) ? empresas : [];
    const dadosProntos = listaSegura.length > 0;

    // 🎯 Ref para os elementos observados
    const elementosRef = useRef([]);

    // 👁️ Lógica de Observação em Lotes (Igual às Categorias)
    useEffect(() => {
        if (!dadosProntos) return;

        let entradasEmLote = [];
        let timerLote = null;

        const observer = new IntersectionObserver((entries) => {
            const elementosVisiveis = entries.filter(entry => entry.isIntersecting);

            if (elementosVisiveis.length > 0) {
                entradasEmLote.push(...elementosVisiveis);
                elementosVisiveis.forEach(entry => observer.unobserve(entry.target));

                if (!timerLote) {
                    timerLote = setTimeout(() => {
                        entradasEmLote.sort((a, b) => {
                            const indexA = Number(a.target.getAttribute('data-index'));
                            const indexB = Number(b.target.getAttribute('data-index'));
                            return indexA - indexB;
                        });

                        entradasEmLote.forEach((entry, i) => {
                            entry.target.style.setProperty('--delay-entrada', `${i * 0.08}s`);
                            entry.target.classList.remove(styles.oculto);
                            entry.target.classList.add(styles.animarEntrada);
                        });

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

    return (
        <div className={styles.container}>
            <main>
                <Head>
                    <title>Empresas | Gameblog</title>
                </Head>
                
                <h2 className={styles.title}>Olá mundo! Você esta na aba de Empresas!</h2>
                
                {/* 👇 Agora utilizando o seu Grid do CSS */}
                <div className={styles.grid}>
                    {dadosProntos ? (
                        listaSegura.map((item, index) => (
                            <div
                                key={item.id}
                                ref={el => elementosRef.current[index] = el}
                                className={styles.oculto}
                                data-index={index}
                            >
                                <Link href={`/empresa/${item.nome}`} className={styles.card}>
                                    <span className={styles.cardName}>{item.nome}</span>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className={styles.loadingText}>Carregando empresas...</p>
                    )}
                </div>
            </main>
        </div>
    );
}