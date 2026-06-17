import {useState} from "react";
import style from "../../style/components/perfil/editarPerfil.module.css"

export default function HistoricoCompras() {
    const [ativo, setAtivo] = useState(false);

    return (
        <section className={`${style.background} ${ativo ? style.aberto : style.fechado}`}>
            <h1 onClick={() => setAtivo(!ativo)} style={{ cursor: 'pointer' }}>
                Histórico de Compras
            </h1>

            <div className={style.conteudoAnimado}>
                <p>Compra</p>
                <p>Compra</p>
                <p>Compra</p>
                <p>Compra</p>
                <p>Compra</p>
                <p>Compra</p>
            </div>
        </section>
    );
}