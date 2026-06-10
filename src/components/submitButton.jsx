import style from "../style/submitButton.module.css";
import Lottie from "lottie-react";
import carregamentoAnimation from "../../public/assets/carregando.json"

export default function SubmitButton({tipo, label, action, carregando}) {
    return(
        <button type={tipo} className={style.submitButton} onClick={action} disabled={carregando}>
            {carregando ? <Lottie animationData={carregamentoAnimation} loop={true} className={style.carregamento}/> : label}
        </button>
    )
}