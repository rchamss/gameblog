import React, { useContext, useEffect, useState } from "react"
import LoginBG from "../src/components/login/login-bg"
import style from '../src/style/login/login.module.css'
import Logo from "../src/components/logo"
import LoginAuthForm from "../src/components/login/loginAuth"
import LoginRegisterForm from "../src/components/login/loginRegister"

export default function Login(){
    const [isNew, setNew] = useState(false)

    function isNewCheck(){ // Validação se o usuário esta querendo logar ou registrar
        if (isNew === false){
            return( // Chamada do componente de Login do usuário
                <main className={style.main}>
                    <span>Faça Login para continuar</span>
                    <LoginAuthForm/>
                    <span className={style.registrar}>Ainda não tem uma conta? <strong onClick={() => setNew(true)}>Cadastre-se</strong></span>
                </main>
            )
        } else {
            return( // Chamada do Componente de Registro do usuário
                <main className={style.main}>
                    <span>Registre-se! Temos bolo :)</span>
                    <LoginRegisterForm/>
                    <span className={style.RegisterSync}>Já tem uma conta? <strong onClick={() => setNew(false)}>Iniciar Sessão</strong></span>
                </main>
            )
        }
    }
    return( // Retorno padrão do componente
        <LoginBG>
            <div className={style.div}>
                <Logo/>
                {isNewCheck()}
            </div>
        </LoginBG>
    )
}
//}