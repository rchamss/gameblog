import style from "../../style/components/jogo/gameTrailer.module.css"
import GameName from "./gameName";
import {useContext} from "react";
import {JogoContext} from "../../../pages/jogo/[id]";

export default function GameTrailer({src}){
    const {jogo, jogoComplementaryData} = useContext(JogoContext)
    return(
        <div className={style.container}>
            <GameName src={jogo.nome}/>
            <div className={style.container_gametrailer}>
                <iframe src={`${src}&autoplay=1&mute=1&rel=0`}
                        title="Trailer do Jogo"
                        loading="lazy"
                        allowFullScreen
                        className={style.gametrailer}>
                </iframe>
        </div>
        </div>
    )
}