import style from '../../style/components/login/login-bg.module.css'

export default function LoginCardBG( {children} ){ // Plano de fundo do card (Card Azul)
    return(
            <div className={style.card}>
                {children}
            </div>
    )
}