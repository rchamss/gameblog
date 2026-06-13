import style from "../../style/components/jogo/button_proximoJogo.module.css"

export default function ButtonProximoJogo({sentido}){
    return(
        <button className={style.botao}>
            <img src='/assets/proximoJogoButton.svg'/>
        </button>
    )
}