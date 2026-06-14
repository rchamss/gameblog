export default async function FazerLogin(valueEmail, valueSenha){
    const resposta = await fetch('https://gameblog-api.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: valueEmail,
            senha: valueSenha
        })
    })

    const dados = await resposta.json()
    if (resposta.ok){
        localStorage.setItem('token', dados.token)
        return dados
    } 
    else { 
        console.log(dados)
        throw { status: resposta.status, mensagem: dados.message }
    }

}

export async function RegistrarUsuario(valueEmail, valueSenha, valueNome, valueDtNasc){
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
    if (resposta.ok){ 
        localStorage.setItem('token', dados.token)
        return dados
    } else { throw new Error(dados.message) }
}