// Inputs base
import { useState } from 'react'
import {useRouter} from "next/router";
import style from '../../style/login/loginAuth.module.css'
import FazerLogin from '../../models/user'
import Campo from '../login/components/input'
import SubmitButton from "../submitButton";
import useSystemMensage from '../../hooks/useSystemMensage';

export default function LoginAuthForm(){
    const [valueEmail, setEmail] = useState()
    const [valueSenha, setSenha] = useState()
    const [valueCarregando, setCarregando] = useState(false)
    const router = useRouter()
    const {callSystemMensagem} = useSystemMensage()

    async function handleLogin(event){
        event.preventDefault()
        try{
            setCarregando(true)
            const dados = await FazerLogin(valueEmail, valueSenha)
            await router.push('/recomendado')
            callSystemMensagem('valid', dados.message)
        }
        catch (error){
            callSystemMensagem('valid', error.message)
            setCarregando(false)
        }
        finally {
            setCarregando(false)
        }
    }
    return(
    <form className={style.login} onSubmit={handleLogin}>
        <Campo tipo='email' label='Usuário' img='/assets/user.svg' obrigatorio={true} aoDigitar={setEmail} autoComplete={'email'}/>
        <Campo tipo='password' label='Senha' img='/assets/key.svg' obrigatorio={true} aoDigitar={setSenha} autoComplete={'current-password'}/>
        <SubmitButton tipo='submit' label='Fazer Login' action={null} carregando={valueCarregando}/>
    </form>
    )
}