import {useState} from "react";
import SubmitButton from "../submitButton";
import Campo from "../login/components/input";
import style from "../../style/components/perfil/editarPerfil.module.css"

export default function EditarPerfil() {
    const [ativo, setAtivo] = useState(false);

    return (
        <section className={`${style.background} ${ativo ? style.aberto : style.fechado}`}>
            <h1 onClick={() => setAtivo(!ativo)} style={{ cursor: 'pointer' }}>
                Editar Perfil
            </h1>

            <div className={style.conteudoAnimado}>
                <div className={style.campo}>
                    <span>Nome:</span> <Campo/>
                </div>
                <div className={style.campo}>
                    <span>Senha:</span> <Campo/>
                </div>
                <div className={style.campo}>
                    <span>E-mail:</span> <Campo/>
                </div>
                <div className={style.campo}>
                    <span>Data de Nascimento:</span> <Campo/>
                </div>

                <div className={style.campo}>
                    <SubmitButton/>
                </div>

                <span className={style.aviso}>Apenas informações inseridas serão alteradas</span>
            </div>
        </section>
    );
}