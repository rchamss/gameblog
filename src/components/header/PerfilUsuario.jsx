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
        return (
            <div className={style.container}>
                <img src="/profile.svg" alt="Menu de Perfil"/>

                <div className={style.dropdown}>
                    <Link href={'/perfil'}>Perfil</Link>
                    {isAutenticado ? <Link href={'/perfil'}>Empresas</Link> : null}
                    <Link href={'/'}>Biblioteca</Link>
                    <Link href={'/'}>Configurações</Link>
                </div>
            </div>
        )
}