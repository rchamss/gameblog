// Inputs base
import { useEffect, useState } from 'react'

// Import de Componentes
import Campo from '../login/components/input'
import Logo from '../logo'

// Import de CSS
import style from '../../style/login/loginAuth.module.css'

// Import de Models
import FazerLogin, { RegistrarUsuario } from '../../models/user'


export default function LoginAuthForm(){
    const [valueEmail, setEmail] = useState()
    const [valueSenha, setSenha] = useState()
    const [valueNome, setNome] = useState()
    const [valueDtNasc, setDt] = useState()
        
    return(
    <form className={style.login}>
        <Campo tipo='email' label='Usuário' img='/assets/user.svg' obrigatorio={true} aoDigitar={setEmail}/>
        <Campo tipo='password' label='Senha' img='/assets/key.svg' obrigatorio={true} aoDigitar={setSenha}/>
        <button onClick={(event) => FazerLogin(event, valueEmail, valueSenha)} className={style.loginButton}>Logar</button>
    </form>
    )
}