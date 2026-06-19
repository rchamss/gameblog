import React from "react";
import Link from "next/link";
import styles from "../src/style/pages/index.module.css";
import useBuscarCarrinhos from "../src/hooks/Api/protected/useBuscarCarrinhos";
import useBuscarJogosMaisVendidos from "../src/hooks/Api/protected/useBuscarJogosMaisVendidos";
// import usePublicBuscarJogos from "../src/hooks/Api/useBuscarJogos"
// import useBuscarUsuario from "../src/hooks/Api/protected/useBuscarUsuario";
import Head from "next/head";

export default function Gameblog() {

    return (
        <main className={styles.mainContainer}>
            <Head>
                <title>gameblog!</title>
            </Head>
            <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.videoBackground}
            >
                <source src="/background-video.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos em HTML5.
            </video>

            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>Bem vindo(a) ao gameblog!</h1>
                <p className={styles.subtitle}>O lugar onde a escolha não é um desafio.</p>

                <Link href="/recomendado" className={styles.ctaButton}>
                    Encontrar uma aventura!
                </Link>
            </div>
        </main>
    );
}