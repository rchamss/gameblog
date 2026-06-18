import { useContext } from "react";
import { MensagemContext } from "../../../../pages/_app";
import { useRequireLogin } from "../../useRequireLogin";
import { useRouter } from "next/router";
import { apiPath } from "../../../../infra/api";

export default function useAddCarrinho() {
    const { mostrarMensagem } = useContext(MensagemContext);
    const { token } = useRequireLogin();
    const router = useRouter();

    // Esta é a função que será chamada no clique do botão
    const addCarrinho = async (jogoID) => {
        if (!token) {
            router.push('/login');
            mostrarMensagem(400, 'Necessário Realizar Login para efetuar compras')
            return;
        }

        try { // try padrão do POST na API
            const resposta = await fetch(`${apiPath}/carrinho/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    jogoId: Number(jogoID),
                })
            });
            const dadosApi = await resposta.json();

            if (resposta.status === 400){
                mostrarMensagem(200, dadosApi.message || 'Jogo já adicionado ao carrinho!');
            }

            if (!resposta.ok) {
                // Agora 'dadosApi' já existe para pegarmos a mensagem de erro da API
                throw { status: resposta.status, mensagem: dadosApi.message || 'Erro na requisição' };
            }
            mostrarMensagem(200, dadosApi.message || 'Jogo adicionado ao carrinho!');

        } catch (error) {
            mostrarMensagem(error.status || 400, error.mensagem || 'Não foi possível processar a compra.');
        }
    };

    return { addCarrinho };
}