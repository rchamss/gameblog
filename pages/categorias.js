import React from "react"
import useBuscarCategorias from "../src/hooks/Api/protected/useBuscarCategorias"
import Link from "next/link"
import styles from "../src/style/components/categorias/categorias.module.css"
import { categoriasData } from "../src/data/complementaryDataCategorias"
import useAwaitLoading from "../src/hooks/useAwaitLoading"
import Carregamento from "../src/components/loading"

export default function Categorias(){
    const categorias = useBuscarCategorias()

    const listaSegura = Array.isArray(categorias) ? categorias : (categorias?.data || [])

    const obterImagemDaCategoria = (nomeCategoria) => {
        if (!nomeCategoria) return "https://placehold.co/960x310/2D2D2D/ffffff.png?text=Gameblog"

        const limparString = (str) =>
            str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        const categoriaEncontrada = categoriasData.find(
            (cat) => limparString(cat.nome) === limparString(nomeCategoria)
        )

        return categoriaEncontrada?.imagemCapa || `https://placehold.co/960x310/01569A/ffffff.png?text=${encodeURIComponent(nomeCategoria)}`
    }
    const dadosProntos = useAwaitLoading(listaSegura)

    if (dadosProntos) {
        return (
            <main className={styles.container}>
                <h2 className={styles.title}>Tipos de Jogos</h2>

                <div className={styles.grid}>
                    {listaSegura.length > 0 ? (
                        listaSegura.map((item, index) => {
                            const imagemFundo = obterImagemDaCategoria(item.nome)
                            const delaySeconds = `${index * 0.1}s`

                            return (
                                /* DIV PAI: Controla estritamente a animação de entrada em cascata */
                                <div
                                    key={item.id}
                                    className={styles.animarEntrada}
                                    style={{ '--delay-entrada': delaySeconds }}
                                >
                                    {/* LINK FILHO: Livre para executar a animação de Hover sem bloqueios */}
                                    <Link
                                        href={`/categoria/${encodeURIComponent(item.nome)}`}
                                        className={styles.card}
                                        style={{ backgroundImage: `url(${imagemFundo})` }}
                                    >
                                        <div className={styles.overlay}></div>
                                        <span className={styles.cardName}>{item.nome}</span>
                                    </Link>
                                </div>
                            )
                        })
                    ) : (
                        <p className={styles.loadingText}>Carregando categorias...</p>
                    )}
                </div>

                <h2 className={styles.title}>Outras Categorias</h2>

                {/* DIV PAI (Empresas): Entra logo após o último card da lista anterior */}
                <div
                    className={styles.animarEntrada}
                    style={{ '--delay-entrada': `${listaSegura.length * 0.1}s` }}
                >
                    <Link
                        href={'/empresas'}
                        className={styles.cardOther}
                    >
                        <span className={styles.cardName}>Empresas</span>
                    </Link>
                </div>

                <div className={styles.grid}>
                </div>
            </main>
        )
    }

    return(
        <main className={styles.carregando}>
            <Carregamento/>
        </main>
    )
}