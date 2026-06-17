import {useContext, useEffect, useState} from "react";
import {MensagemContext} from "../../../../pages/_app";
import {useRequireLogin} from "../../useRequireLogin";
import {useRouter} from "next/router";
import {apiPath} from "../../../../infra/api";

export default function useBuscarUsuario(){ //Requisita o usuário logado para a API
    const { mostrarMensagem } = useContext(MensagemContext)
    const [user, setUser] = useState(null)
    const { token, id_user } = useRequireLogin()
    const router = useRouter()
    useEffect(() => {
        if (!token) return
        async function getAPI() {
            try{
                const resposta = await fetch(`${apiPath}/usuarios/${id_user}`, {
                    headers: {'Authorization': `Bearer ${token}`}})
                const api = await resposta.json()
                if(!resposta.ok){
                    throw { status: resposta.status, mensagem: api.message }
                }
                setUser(api)
            }
            catch(error) {
                console.log('erro completo:', error)
                router.push('/login')
                mostrarMensagem(error.status, error.mensagem)
            }
        }
        getAPI()
    }, [token])
    return user
}