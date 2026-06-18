import { useContext } from "react";
import { MensagemContext } from "../../../../pages/_app";
import { useRequireLogin } from "../../useRequireLogin";
import { useRouter } from "next/router";
import { apiPath } from "../../../../infra/api";

export default function useAddFinalizarCompra() {
    const { mostrarMensagem } = useContext(MensagemContext);
    const { token } = useRequireLogin();
    const router = useRouter();

    // Esta é a função que será chamada no clique do botão
    const endCarrinho = async (metodo) => {
        if (!token) {
            router.push('/login');
            mostrarMensagem(400, 'Necessário Realizar Login para efetuar compras')
            return;
        }

        try { // try padrão do POST na API
            const resposta = await fetch(`${apiPath}/vendas/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    metodo: metodo.toLowerCase(),
                })
            });
            const dadosApi = await resposta.json();

            if (resposta.status === 400){
                mostrarMensagem(200, dadosApi.message || 'Compra efetuada com sucesso!');
            }

            if (!resposta.ok) {
                // Agora 'dadosApi' já existe para pegarmos a mensagem de erro da API
                throw { status: resposta.status, mensagem: dadosApi.message || 'Erro na requisição' };
            }
            mostrarMensagem(resposta.status, dadosApi.message);

        } catch (error) {
            mostrarMensagem(error.status || 400, error.mensagem || 'Não foi possível processar a compra.');
        }
    };

    return { endCarrinho };
}