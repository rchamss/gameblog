import { useContext } from "react"
import { JogoContext } from "../../../pages/jogo/[id]"
import style from "../../style/components/jogo/gameDescricao.module.css"
import GameCategoria from "./gameCategoria"
import GamePrice from "./gamePrice"

export default function GameDescricao(){
    const {jogo, jogoComplementaryData, jogoPublic} = useContext(JogoContext)
    return (
        <div className={style.container}>
            <div className={style.subContainer}>
                <section className={style.descricaoContainer}>
                    <p>{jogoComplementaryData.descrição}</p>
                    <h3>Categoria: <strong className={style.categoria}>{jogoPublic.categoria}</strong></h3>
                </section>
                <GamePrice/>
            </div>
            <img src={jogoComplementaryData.capa} className={style.capa} alter="Capa do Jogo"/>
        </div>
    )
}