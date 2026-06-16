import React from "react"
import useBuscarUsuario from "../src/hooks/Api/protected/useBuscarUsuario";
import Carregamento from "../src/components/loading";
import {useRequireLogin} from "../src/hooks/useRequireLogin";
import EditarPerfil from "../src/components/perfil/CampoPerfilNome";
import style from "../src/style/pages/perfil.module.css"
export default function Perfil(){
    useRequireLogin()
    const user = useBuscarUsuario()
    console.log(user)
    if(user){
        return (
            <div className={style.background}>
                <main className={style.background_card}>
                    <div className={style.perfil_container}>
                        <img src="/profile.svg"/>
                        <h2>{user.nome}</h2>
                    </div>
                    <section className={style.abas}>
                        <EditarPerfil/>
                    </section>
                </main>
            </div>
        )
    }
    else{
        return (
            <div>
                <Carregamento />
            </div>
        )
    }
}