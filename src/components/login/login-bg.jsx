import style from '../../style/login/login-bg.module.css'

export default function LoginBG( {children} ){
    return(
        <div className={style.bg}>
            <div className={style.card}>
                {children}
            </div>
        </div>
    )
}