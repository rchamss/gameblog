import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MensagemContext } from '../../pages/_app'

export function useRequireLogin() {
    const router = useRouter()
    const [logado, setLogado] = useState(false)
    const [token, setToken] = useState(null)
    const {mostrarMensagem} = useContext(MensagemContext)
     useEffect(() =>{
        const temToken = localStorage.getItem('token')
        if (temToken){
            setToken(temToken)
            setLogado(true)
        }
        else{
            mostrarMensagem(404, 'Necessário realizar Login para acessar esta página')
            router.push('/login')
        }
    } , [])
    return token
}