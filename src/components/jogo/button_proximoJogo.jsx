import style from "../../style/components/jogo/button_proximoJogo.module.css";

export default function ButtonProximoJogo({ sentido }) {
    return (
        <button className={style.botao}>
            <img
                className={style.darkIcon}
                src="/assets/proximoJogoButton.svg"
                alt="Próximo jogo"
            />

            <img
                className={style.lightIcon}
                src="/assets/proximoJogoButtonLight.svg"
                alt="Próximo jogo"
            />
        </button>
    );
}