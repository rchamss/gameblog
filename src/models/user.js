import { useEffect } from "react";
import { useRouter } from "next/router";
import useRedirect from "../../hooks/useRedirect";

export default async function FazerLogin(event, valueEmail, valueSenha){
    event.preventDefault();
    const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: valueEmail,
            senha: valueSenha
        })
    })
    const dados = await resposta.json()
    await localStorage.setItem('token', dados.token)
    const token = await localStorage.getItem('token', dados.token)
    //token ? useRedirect('/index') : console.log('token não encontrado') <---- Preciso ajustar isso para o hook de redirecionamento
}

export async function RegistrarUsuario(event, valueEmail, valueSenha, valueNome, valueDtNasc){
    event.preventDefault();

    const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: valueNome,
            email: valueEmail,
            senha: valueSenha,
            dataNascimento: valueDtNasc
        })
    })

    const dados = await resposta.json()
    console.log(dados)
}