import {useRouter} from "next/router";
import { useState } from 'react'
import { RegistrarUsuario } from '../../models/user'
import style from '../../style/login/loginRegister.module.css'
import Campo from './components/input'
import SubmitButton from "../submitButton";

export default function LoginRegisterForm(){
    const [valueEmail, setEmail] = useState()
    const [valueSenha, setSenha] = useState()
    const [valueNome, setNome] = useState()
    const [valueDtNasc, setDt] = useState()
    const [valueCarregando, setCarregando] = useState(false)
    const router = useRouter()

    async function handleRegister(event){
        event.preventDefault()
        try{
            setCarregando(true)
            await RegistrarUsuario(valueEmail, valueSenha, valueNome, valueDtNasc)
            await router.push('/recomendado')
        }
        catch (error){
            console.log(error.message)
            setCarregando(false)
        }
        finally {
            setCarregando(false)
        }
    }
    return(
        <form className={style.register} onSubmit={handleRegister}>
            <Campo tipo='text' label='Qual seu nome?' img='/assets/user.svg' obrigatorio={true} aoDigitar={setNome} />
            <Campo tipo='text' label='Insira sua data de nascimento (dd/mm/yyyy)' img='/assets/user.svg' obrigatorio={true} aoDigitar={setDt}/>
            <Campo tipo='email' label='Informe um e-mail' img='/assets/key.svg' obrigatorio={true} aoDigitar={setEmail}/>
            <Campo tipo='password' label='Insira uma senha' img='/assets/key.svg' obrigatorio={true} aoDigitar={setSenha}/>
            <SubmitButton tipo='submit' label='Criar Conta!' action={null} carregando={valueCarregando}/>
        </form>
    )
}