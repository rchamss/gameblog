import React from "react"
import useBuscarCategorias from "../src/hooks/Api/protected/useBuscarCategorias"
import Link from "next/link"
import styles from "../src/style/components/categorias/categorias.module.css"
import { categoriasData } from "../src/data/complementaryDataCategorias" 

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

    return (
        <main className={styles.container}>
            <h2 className={styles.title}>Tipos de Jogos</h2>
            
            <div className={styles.grid}>
                {listaSegura.length > 0 ? (
                    listaSegura.map((item) => {
                        const imagemFundo = obterImagemDaCategoria(item.nome)
                        
                        return (
                            <Link 
                                key={item.id} 
                                href={`/categoria/${encodeURIComponent(item.nome)}`}
                                className={styles.card}
                                style={{ backgroundImage: `url(${imagemFundo})` }}
                            >
                                <div className={styles.overlay}></div>
                                <span className={styles.cardName}>{item.nome}</span>
                            </Link>
                        )
                    })
                ) : (
                    <p className={styles.loadingText}>Carregando categorias...</p>
                )}
            </div>

            <h2 className={styles.title}>Outras Categorias</h2>
            <div className={styles.grid}>
            </div>
        </main>
    )
}