import style from '../../style/login/login-bg.module.css'

export default function LoginCardBG( {children} ){ // Plano de fundo do card (Card Azul)
    return(
            <div className={style.card}>
                {children}
            </div>
    )
}