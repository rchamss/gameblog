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
    console.log(dados)
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