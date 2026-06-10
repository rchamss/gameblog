import style from '../../style/login/login-bg.module.css'

export default function LoginCardBG( {children} ){
    return(
            <div className={style.card}>
                {children}
            </div>
    )
}