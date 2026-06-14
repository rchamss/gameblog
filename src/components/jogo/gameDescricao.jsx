import { useContext } from "react"
import { JogoContext } from "../../../pages/jogo/[id]"
import style from "../../style/components/jogo/gameDescricao.module.css"

export default function GameDescricao(){
    const {jogo, jogoComplementaryData} = useContext(JogoContext)
    return (
        <div className={style.container}>
            <p>{jogoComplementaryData.descrição}</p>
            <img src={jogoComplementaryData.capa}/>
        </div>
    )
}