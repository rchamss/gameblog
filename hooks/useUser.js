import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useRequireLogin() {
    const router = useRouter()
    const [verificado, setVerificado] = useState(false)

     useEffect(() =>{
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        }
        setVerificado(true)
    } , [])

    
}