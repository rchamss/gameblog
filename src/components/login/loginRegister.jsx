import style from '../../style/login/loginRegister.module.css'
import { RegistrarUsuario } from '../../models/user'
import { useState } from 'react'
import Campo from './components/input'
export default function LoginRegisterForm(){
    const [valueEmail, setEmail] = useState()
    const [valueSenha, setSenha] = useState()
    const [valueNome, setNome] = useState()
    const [valueDtNasc, setDt] = useState()

    return(
        <form className={style.register}>
            <Campo tipo='text' label='Qual seu nome?' img='/assets/user.svg' obrigatorio={true} aoDigitar={setNome} />
            <Campo tipo='text' label='Insira sua data de nascimento (dd/mm/yyyy)' img='/assets/user.svg' obrigatorio={true} aoDigitar={setDt}/>
            <Campo tipo='email' label='Informe um e-mail' img='/assets/key.svg' obrigatorio={true} aoDigitar={setEmail}/>
            <Campo tipo='password' label='Insira uma senha' img='/assets/key.svg' obrigatorio={true} aoDigitar={setSenha}/>
            <button onClick={(event) => RegistrarUsuario(event, valueEmail, valueSenha, valueNome, valueDtNasc)} className={style.RegisterButton}>Criar usuário!</button>
        </form>
    )
}