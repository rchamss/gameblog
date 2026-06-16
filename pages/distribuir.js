import { useState } from "react";

import Dashboard from "../src/components/distribuir/Dashboard";
import styles from "../src/style/pages/distribuir.module.css";

export default function Distribuir() {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <main className={styles.container}>

            <aside className={styles.sidebar}>
                <h2>Distribuidora</h2>

                <button onClick={() => setActivePage("dashboard")}>
                    Dashboard
                </button>

                <button onClick={() => setActivePage("empresa")}>
                    Minha Empresa
                </button>

                <button onClick={() => setActivePage("jogos")}>
                    Jogos
                </button>

                <button onClick={() => setActivePage("categorias")}>
                    Categorias
                </button>

                <button onClick={() => setActivePage("relatorios")}>
                    Relatórios
                </button>
            </aside>

            <section className={styles.content}>

                <div className={styles.pageHeader}>
                    <h1>Área da Distribuidora</h1>
                </div>

                <div className={styles.pageContent}>
                    {activePage === "dashboard" && <Dashboard />}

                    {activePage === "empresa" && (
                        <h2>Minha Empresa</h2>
                    )}

                    {activePage === "jogos" && (
                        <h2>Jogos</h2>
                    )}

                    {activePage === "categorias" && (
                        <h2>Categorias</h2>
                    )}

                    {activePage === "relatorios" && (
                        <h2>Relatórios</h2>
                    )}
                </div>

            </section>

        </main>
    );
}