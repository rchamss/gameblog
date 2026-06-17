import { useContext } from "react";
import { JogoContext } from "../../../pages/jogo/[id]";
import style from "../../style/components/jogo/gameName.module.css"
import ButtonProximoJogo from "./button_proximoJogo";

export default function GameName(){
    const {jogo, jogoComplementaryData} = useContext(JogoContext)

    return (
            <div className={style.jogoNome}>
                <h1>{jogo.nome}</h1>
                <p>{jogo.descricao}</p>
            </div>
    )
}