import { useContext } from "react";
import { MensagemContext } from "../../../../pages/_app";
import { useRequireLogin } from "../../useRequireLogin";
import { useRouter } from "next/router";
import { apiPath } from "../../../../infra/api";

export default function useAddAvaliacao() {
    const { mostrarMensagem } = useContext(MensagemContext);
    const { token, id_user } = useRequireLogin();
    const router = useRouter();

    // Esta é a função que será chamada no clique do botão
    const enviarAvaliacao = async (jogoID, avaliacao, mensagem) => {
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const resposta = await fetch(`${apiPath}/avaliacoes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    jogoId: Number(jogoID),
                    nota: Number(avaliacao),
                    comentario: mensagem.trim()
                })
            });

            const dadosApi = await resposta.json();

            if (!resposta.ok) {
                // Agora 'dadosApi' já existe para pegarmos a mensagem de erro da API
                throw { status: resposta.status, mensagem: dadosApi.message || 'Erro na requisição' };
            }

            mostrarMensagem(200, dadosApi.message || 'Avaliação enviada com sucesso!');

        } catch (error) {
            console.log('erro completo:', error);

            // Se for erro de autorização (401), manda pro login
            if (error.status === 401) {
                router.push('/login');
            }

            mostrarMensagem(error.status || 400, error.mensagem || 'Não foi possível processar a avaliação.');
        }
    };

    return { enviarAvaliacao };
}