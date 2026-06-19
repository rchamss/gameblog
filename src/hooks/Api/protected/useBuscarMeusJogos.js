import { useState, useCallback, useContext } from "react";
import { MensagemContext } from "../../../../pages/_app";
import { useRequireLogin } from "../../useRequireLogin";
import { useRouter } from "next/router";
import { apiPath } from "../../../../infra/api";

export default function useBuscarMeusJogos() {
    const { mostrarMensagem } = useContext(MensagemContext);
    const { token } = useRequireLogin();
    const router = useRouter();

    const [meusJogos, setMeusJogos] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const buscarMeusJogos = useCallback(async () => {
        // Se o useRequireLogin ainda está buscando do localStorage, saímos sem estourar erro
        if (!token) return;

        setCarregando(true);

        try {
            const resposta = await fetch(`${apiPath}/usuarios/my/games`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (resposta.status === 204) {
                setMeusJogos([]);
                return;
            }

            const dadosApi = await resposta.json();

            if (!resposta.ok) {
                throw { status: resposta.status, mensagem: dadosApi.message || 'Erro ao buscar seus jogos' };
            }

            setMeusJogos(dadosApi);

        } catch (error) {
            mostrarMensagem(error.status || 500, error.mensagem || 'Não foi possível carregar a sua biblioteca de jogos.');
        } finally {
            setCarregando(false);
        }
    }, [token, mostrarMensagem]);

    return { meusJogos, buscarMeusJogos, carregando };
}