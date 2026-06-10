import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useRequireLogin() {
    const router = useRouter()
    const [logado, setLogado] = useState(false)
     useEffect(() =>{
        const token = localStorage.getItem('token')
        token ? setLogado(true) : router.push('/login')
    } , [])
}