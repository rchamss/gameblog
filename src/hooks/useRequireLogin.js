import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useRequireLogin() {
    const router = useRouter()
    const [logado, setLogado] = useState(false)
    const [token, setToken] = useState(null)
     useEffect(() =>{
        const temToken = localStorage.getItem('token')
        if (temToken){
            setToken(temToken)
            setLogado(true)
        }
        else{
            
        }
    } , [])
    return token
}