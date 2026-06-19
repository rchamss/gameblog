import { useContext, useEffect, useState, useCallback } from "react"
import { MensagemContext } from "../../../../pages/_app"
import { apiPath } from "../../../../infra/api";
import { useRequireLogin } from "../../useRequireLogin";

export default function useBuscarCarrinhoAtivo(){ 
    const [carrinho, setCarrinho] = useState([])
    const { mostrarMensagem } = useContext(MensagemContext)
    const { token } = useRequireLogin()

    // 🔄 Isolamos a função de busca e usamos useCallback para ela ser reaproveitada pelo EventListener
    const getAPI = useCallback(async () => {
        if (!token) return;

        try {
            const resposta = await fetch(`${apiPath}/carrinho/ativo`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(!resposta.ok) { 
                // Corrigido: 'api' ainda não existia aqui para pegar a mensagem
                throw { status: resposta.status, mensagem: "Falha ao consultar o carrinho." };
            }

            try {
                const dados = await resposta.json();
                setCarrinho(dados);
            } catch (error) {
                // Se a API não devolver JSON (carrinho vazio), zeramos a lista
                setCarrinho([]); 
            }

        } catch(error) {
            mostrarMensagem(error.status || 400, error.mensagem || "Erro na conexão");
        }
    }, [token, mostrarMensagem]);

    useEffect(() => {
        if (!token) return;

        // 1. Faz a busca normal assim que o componente carrega na tela
        getAPI();

        // 2. Fica "ouvindo" o aviso de que um novo item foi adicionado
        window.addEventListener('carrinhoAtualizado', getAPI);

        // 3. Remove o ouvido quando o componente for destruído (evita vazamento de memória)
        return () => {
            window.removeEventListener('carrinhoAtualizado', getAPI);
        };
    }, [token, getAPI]);

    return carrinho;
}