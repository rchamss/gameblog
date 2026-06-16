import style from '../../style/components/header/PerfilUsuario.module.css'
import Link from "next/link";
import {useVerificarLogin} from "../../hooks/useRequireLogin";
import useBuscarUsuario from "../../hooks/Api/protected/useBuscarUsuario";
import {useEffect} from "react";

export default function PerfilUsuario() {
    const user = useBuscarUsuario()

        return (
            <div className={style.container}>
                <img src="/profile.svg" alt="Menu de Perfil"/>

                <div className={style.dropdown}>
                    <Link href={'/perfil'}>Perfil</Link>
                    <Link href={'/'}>Biblioteca</Link>
                    <Link href={'/'}>Configurações</Link>
                </div>
            </div>
        )
}