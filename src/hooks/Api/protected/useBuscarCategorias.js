import { useContext, useEffect, useState } from "react"
import { useRequireLogin } from "../../useRequireLogin"
import { useRouter } from "next/router"
import { MensagemContext } from "../../../../pages/_app"
import {apiPath} from "../../../../infra/api";

export default function useBuscarCategorias(){ //Requisita as Categorias disponiveis na API
    const { mostrarMensagem } = useContext(MensagemContext)
    const [categorias, setCategorias] = useState([])
    const token = useRequireLogin()
    const router = useRouter()
    useEffect(() => {

        if (!token) return

        async function getAPI() {
            try{
                const resposta = await fetch(`${apiPath}/categorias`, {
                headers: {'Authorization': `Bearer ${token}`}})
                const api = await resposta.json()
                console.log(api)   
                
                if(!resposta.ok){
                    throw { status: resposta.status, mensagem: api.message }
                }
                setCategorias(api)
            }
            catch(error) {
                router.push('/login')
                mostrarMensagem(error.status, error.mensagem)
            }
        }

        getAPI()

    }, [token])

    return categorias
}
