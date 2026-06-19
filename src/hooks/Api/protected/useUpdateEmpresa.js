import { useContext } from "react";
import { MensagemContext } from "../../../../pages/_app";
import { useRequireLogin } from "../../useRequireLogin";
import { useRouter } from "next/router";
import { apiPath } from "../../../../infra/api";

export default function useUpdateEmpresa() {
    const { mostrarMensagem } = useContext(MensagemContext);
    const { token } = useRequireLogin();
    const router = useRouter();

    const updateEmpresa = async (id, nomeEmpresa) => {
        if (!token) {
            router.push('/login');
            mostrarMensagem(401, 'Necessário realizar login como Administrador.');
            return;
        }

        try {
            const resposta = await fetch(`${apiPath}/empresas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    nome: nomeEmpresa
                })
            });
            
            let dadosApi = {};
            try { dadosApi = await resposta.json(); } catch(e) {}

            if (!resposta.ok) {
                throw { status: resposta.status, mensagem: dadosApi.message || 'Erro ao atualizar a empresa.' };
            }
            
            mostrarMensagem(resposta.status, dadosApi.message || 'Empresa atualizada com sucesso!');
            return dadosApi;

        } catch (error) {
            mostrarMensagem(error.status || 500, error.mensagem || 'Não foi possível processar a atualização da empresa.');
            throw error;
        }
    };

    return { updateEmpresa };
}