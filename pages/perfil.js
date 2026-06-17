import React from "react"
import useBuscarUsuario from "../src/hooks/Api/protected/useBuscarUsuario";
import Carregamento from "../src/components/loading";
import {useRequireLogin} from "../src/hooks/useRequireLogin";
import EditarPerfil from "../src/components/perfil/EditarPerfil";
import style from "../src/style/pages/perfil.module.css"
import Config from "../src/components/perfil/config";
import HistoricoCompras from "../src/components/perfil/historico";
import Avaliacoes from "../src/components/perfil/avaliacoes";

export default function Perfil(){
    useRequireLogin()
    const user = useBuscarUsuario()
    if(user){
        return (
            <div className={style.background}>
                <button>Voltar</button>
                <main className={style.background_card}>
                    <div className={style.perfil_container}>
                        <img src="/profile.svg"/>
                        <h2>{user.nome}</h2>
                    </div>
                    <section className={style.abas}>
                        <EditarPerfil/>
                        <Config/>
                        <HistoricoCompras/>
                        <Avaliacoes/>
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