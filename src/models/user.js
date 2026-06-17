import {apiPath} from "../../infra/api";
import {useState} from "react";

export default async function FazerLogin(valueEmail, valueSenha){
    const resposta = await fetch(`${apiPath}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: valueEmail,
            senha: valueSenha
        })
    })

    const dados = await resposta.json()
    if (resposta.ok){
        const payload = JSON.parse(atob(dados.token.split('.')[1])) // converte o token
        localStorage.setItem('token', dados.token)
        localStorage.setItem('id_user', payload.id)
        return dados
    } 
    else {
        throw { status: resposta.status, mensagem: dados.message }
    }

}

export async function RegistrarUsuario(valueEmail, valueSenha, valueNome, valueDtNasc){
    const resposta = await fetch(`${apiPath}/auth/register`, {
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
    if (resposta.ok){ 
        localStorage.setItem('token', dados.token)
        return dados
    } else { throw { status: resposta.status, mensagem: dados.message } }
}