import { useContext, useEffect, useState } from "react"
import { useRequireLogin } from "../../useRequireLogin"
import { useRouter } from "next/router"
import { MensagemContext } from "../../../../pages/_app"
import {apiPath} from "../../../../infra/api";

export default function useBuscarEmpresas(){ //Requisita as Empresas disponiveis na API
    const { mostrarMensagem } = useContext(MensagemContext)
    const [empresas, setEmpresas] = useState([])
    const {token} = useRequireLogin()
    const router = useRouter()

    useEffect(() => {
        if (!token) return
        async function getAPI() {
            try{
                const resposta = await fetch(`${apiPath}/empresas`, {
                    headers: {'Authorization': `Bearer ${token}`}})
                try{
                    const api = await resposta.json()
                    setEmpresas(api)
                }
                catch (error) {
                    throw { status: 400, mensagem: 'Não foi possivel converter a resposta do servidor' }
                }
                if(!resposta.ok){
                    throw { status: resposta.status, mensagem: api.message }
                }
            }
            catch(error) {
                router.push('/login')
                mostrarMensagem(error.status, error.mensagem)
            }
        }
        getAPI()
    }, [token])

    return empresas
}
