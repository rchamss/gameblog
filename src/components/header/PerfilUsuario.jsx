import style from '../../style/components/header/PerfilUsuario.module.css'
import Link from "next/link";
import {useVerificarLogin} from "../../hooks/useRequireLogin";
import useBuscarUsuario from "../../hooks/Api/protected/useBuscarUsuario";
import {useEffect, useState} from "react";

export default function PerfilUsuario() {
    const [isAutenticado, setisAutenticado] = useState(false)
    const user = useBuscarUsuario()
    console.log(user)

    useEffect(() => {
        if (!user) return
        if (user.fkPerfil === 1) {
            setisAutenticado(true)
        }
    }, [user]);

    if (!user) {
        return (
            <div className={style.container}>
                <img src="/profile.svg" alt="Menu de Perfil"/>
            </div>
        )
    }

        return (
            <div className={style.container}>
                <img src="/profile.svg" alt="Menu de Perfil"/>

                <div className={style.dropdown}>
                    <h2>@ {user.nome}</h2>
                    <Link href={'/perfil'}>Perfil</Link>
                    {isAutenticado ? <Link href={'/empresas'}>Empresas</Link> : null}
                    <Link href={'/biblioteca'} >Biblioteca</Link>
                    {isAutenticado ? <Link href={'/gerenciar'}>Gerenciar</Link> : null}
                    <Link href={'/login'} >Sair</Link>
                </div>
            </div>
        )
}