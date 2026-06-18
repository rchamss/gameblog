import style from '../style/loading.module.css'
import Lottie from "lottie-react";
import carregamentoAnimation from '../../public/assets/carregando.json'

export default function Carregamento(){
    return(
        <div className={style.container}>
            <Lottie animationData={carregamentoAnimation} loop={true} className={style.carregamento}/>
        </div>

    )
}