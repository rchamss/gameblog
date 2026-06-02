import style from '../../style/login/loginAuth.module.css'

export default function LoginAuthForm(){
    return(
        <div className={style.div}>
            <header>
                <img src='/assets/gameblog.svg'/>
            </header>

            <main className={style.main}>
                <span>Faça Login para continuar</span>
                <form className={style.login}>
                    <input className={style.user}/>
                    <input className={style.senha}/>
                    <span className={style.RegisterSync}>Ainda não tem uma conta? <strong>Cadastre-se aqui</strong></span>
                    <button className={style.logon}>Logar</button>
                </form>
            </main>
        </div>
    )
}

//trocar os placeholders por uma melhor acessibilidade posteriormente