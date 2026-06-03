import { useState } from 'react'
import style from '../../style/login/loginAuth.module.css'
import styleRegister from '../../style/login/loginRegister.module.css'

export default function LoginAuthForm(){

    const [isNew, setNew] = useState(false)
    function isNewCheck(){
        if (isNew === false){
        return(
            <main className={style.main}>
                <span>Faça Login para continuar</span>
                <form className={style.login}>
                    <input hmtlFor='user' className={style.user} type='email' required/>
                        <label id='user' className={style.userLabel}>
                            <img src='/assets/user.svg'/>
                            Usuário
                        </label>
                    <input hmtlFor='password' className={style.senha} type='password' required />
                        <label id='password' className={style.passwordLabel}>
                            <img src='/assets/key.svg'/>
                            Senha
                        </label>
                    <span className={style.RegisterSync}>Ainda não tem uma conta? <strong onClick={() => setNew(true)}>Cadastre-se</strong></span>
                    <button className={style.logon}>Logar</button>
                </form>
            </main>
    )} else {
        return(
            <main className={styleRegister.main}>
                <h1>Você é novato</h1>
                <button onClick={() => setNew(false)}>Deixar de ser novato</button>
            </main>
        )

}
}

    return(
        <div className={style.div}>
            <header>
                <img src='/assets/gameblog.svg'/>
            </header>

            {isNewCheck()}
        </div>
    )

    



    
}

//trocar os placeholders por uma melhor acessibilidade posteriormente