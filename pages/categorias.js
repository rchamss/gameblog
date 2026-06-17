import React from "react"
import useBuscarCategorias from "../src/hooks/Api/protected/useBuscarCategorias"
import Link from "next/link"
import styles from "../src/style/components/categorias/categorias.module.css"
import { categoriasData } from "../src/data/complementaryDataCategorias"
import useAwaitLoading from "../src/hooks/useAwaitLoading";
import Carregamento from "../src/components/loading";

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
                        // ADICIONADO: Pegar o 'index' aqui
                        listaSegura.map((item, index) => {
                            const imagemFundo = obterImagemDaCategoria(item.nome)

                            // ADICIONADO: Cálculo do delay (ex: 0.1s por item)
                            const delaySeconds = `${index * 0.03}s`;

                            return (
                                <Link
                                    key={item.id}
                                    href={`/categoria/${encodeURIComponent(item.nome)}`}
                                    // MODIFICADO: Adicionada a classe de animação
                                    className={`${styles.card} ${styles.animarEntrada}`}
                                    // MODIFICADO: Passando o delay como variável CSS inline
                                    style={{
                                        backgroundImage: `url(${imagemFundo})`,
                                        '--delay-entrada': delaySeconds // Variável CSS
                                    }}
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
                <Link
                    key={'empresas'}
                    href={'/empresas'}
                    className={`${styles.cardOther} ${styles.animarEntrada}`}
                    style={{ '--delay-entrada': `${listaSegura.length * 0.1}s` }}
                >
                    <span className={styles.cardName}>Empresas</span>
                </Link>
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