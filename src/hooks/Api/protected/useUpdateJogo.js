import { useContext } from "react";
import { MensagemContext } from "../../../../pages/_app";
import { useRequireLogin } from "../../useRequireLogin";
import { useRouter } from "next/router";
import { apiPath } from "../../../../infra/api";

export default function useUpdateJogo() {
    const { mostrarMensagem } = useContext(MensagemContext);
    const { token } = useRequireLogin();
    const router = useRouter();

    const updateJogo = async (id, dadosJogo) => {
        if (!token) {
            router.push('/login');
            mostrarMensagem(401, 'Necessário realizar login como Administrador.');
            return;
        }

        try {
            const resposta = await fetch(`${apiPath}/jogos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ano: dadosJogo.ano,
                    preco: dadosJogo.preco,
                    fkCategoria: dadosJogo.fkCategoria,
                    fkEmpresa: dadosJogo.fkEmpresa,
                    descricao: dadosJogo.descricao,
                    desconto: dadosJogo.desconto
                })
            });
            
            let dadosApi = {};
            try { dadosApi = await resposta.json(); } catch(e) {}

            if (!resposta.ok) {
                throw { status: resposta.status, mensagem: dadosApi.message || 'Erro ao atualizar o jogo na API' };
            }
            
            mostrarMensagem(resposta.status, dadosApi.message || 'Jogo atualizado com sucesso!');
            return dadosApi;

        } catch (error) {
            mostrarMensagem(error.status || 500, error.mensagem || 'Não foi possível processar a atualização do jogo.');
            throw error;
        }
    };

    return { updateJogo };
}