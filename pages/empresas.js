import styles from "../src/style/pages/empresas.module.css"
import useBuscarEmpresas from "../src/hooks/Api/protected/useBuscarEmpresas";
import Link from "next/link";
import React from "react";
import Head from "next/head";
export default function Distribuir() {
    const empresas = useBuscarEmpresas()
    return (
        <div className={styles.container}>

            <main>
                <Head>
                    <title>Categorias</title>
                </Head>
                <h2 className={styles.title}>Olá mundo! Você esta na aba de Empresas!</h2>
                {empresas.map((item) => {
                    return(
                        <Link
                            key={item.id}
                            href={`/empresa/${item.nome}`}
                            className={styles.card}>
                            <span className={styles.cardName}>{item.nome}</span>
                        </Link>
                    )
                }
                )}
            </main>
        </div>
    );
}