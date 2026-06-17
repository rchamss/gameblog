import { useContext } from "react"
import { JogoContext } from "../../../pages/jogo/[id]"
import GameTrailer from "./gameTrailer"
import style from "../../style/components/jogo/ApresentacaoJogo.module.css"
import GameName from "./gameName"
import GameDescricao from "./gameDescricao"

export default function ApresentacaoJogo(){
    const {jogo, jogoComplementaryData} = useContext(JogoContext)
    return(
        <div className={style.div}>
            <GameName src={jogo.nome}/>
            <GameTrailer src={jogoComplementaryData.video}/>
            <GameDescricao/>
        </div>
    )
}