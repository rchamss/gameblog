// Inputs base
import { useState } from 'react'

// Import de Componentes
import Campo from '../login/components/input'
import Logo from '../logo'

// Import de CSS
import style from '../../style/login/loginAuth.module.css'
import styleRegister from '../../style/login/loginRegister.module.css'

// Import de Models
import FazerLogin, { RegistrarUsuario } from '../../models/user'



export default function LoginAuthForm(){

    const [isNew, setNew] = useState(false)
    const [valueEmail, setEmail] = useState()
    const [valueSenha, setSenha] = useState()
    const [valueNome, setNome] = useState()
    const [valueDtNasc, setDt] = useState()
    
    function isNewCheck(){ // Validação se o usuário esta querendo logar ou registrar
        if (isNew === false){
            return( // Sessão de Login do usuário
                <main className={style.main}>
                    <span>Faça Login para continuar</span>
                    <form className={style.login}>
                        <Campo tipo='email' label='Usuário' img='/assets/user.svg' obrigatorio={true} aoDigitar={setEmail}/>
                        <Campo tipo='password' label='Senha' img='/assets/key.svg' obrigatorio={true} aoDigitar={setSenha}/>
                        <span className={style.registrar}>Ainda não tem uma conta? <strong onClick={() => setNew(true)}>Cadastre-se</strong></span>
                        <button onClick={(event) => FazerLogin(event, valueEmail, valueSenha)} className={style.loginButton}>Logar</button>
                    </form>
                </main>
            )
        } else {
            return( // Sessão de Registro do usuário
                <main className={styleRegister.main}>
                    <span>Registre-se! Temos bolo :)</span>
                    <form className={styleRegister.register}>
                        <Campo tipo='text' label='Qual seu nome?' img='/assets/user.svg' obrigatorio={true} aoDigitar={setNome} />
                        <Campo tipo='text' label='Insira sua data de nascimento (dd/mm/yyyy)' img='/assets/user.svg' obrigatorio={true} aoDigitar={setDt}/>
                        <Campo tipo='email' label='Informe um e-mail' img='/assets/key.svg' obrigatorio={true} aoDigitar={setEmail}/>
                        <Campo tipo='password' label='Insira uma senha' img='/assets/key.svg' obrigatorio={true} aoDigitar={setSenha}/>
                        <span className={styleRegister.RegisterSync}>Já tem uma conta? <strong onClick={() => setNew(false)}>Iniciar Sessão</strong></span>
                        <button onClick={(event) => RegistrarUsuario(event, valueEmail, valueSenha, valueNome, valueDtNasc)} className={styleRegister.RegisterButton}>Criar usuário!</button>
                    </form>
                </main>
            )
        }
    }

    return( // Retorno padrão do componente
        <div className={style.div}>
            <Logo/>
            {isNewCheck()}
        </div>
    )
}