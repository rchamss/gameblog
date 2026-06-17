import {useContext, useState} from "react";
import {JogoContext} from "../../../pages/jogo/[id]";
import style from "../../style/components/jogo/GaleriaJogo.module.css"
export default function GaleriaJogo() {
    const {jogo, jogoComplementaryData} = useContext(JogoContext)
    const [imagemSelecionada, setImagemSelecionada] = useState(null)
    return (
        <section className={style.sessao}>
            {imagemSelecionada && (
                <div className={style.modal} onClick={() => setImagemSelecionada(null)}>
                    <img src={imagemSelecionada} className={style.imagemModal}/>
                </div>
            )}

            <h1>Galeria</h1>
            <figure className={style.destaque}>
                <img src={jogoComplementaryData.imagens[0]} onClick={() => setImagemSelecionada(jogoComplementaryData.imagens[0])} alt="Screenshot principal"/>
            </figure>
            <div className={style.grid}>
                <figure>
                    <img src={jogoComplementaryData.imagens[1]} onClick={() => setImagemSelecionada(jogoComplementaryData.imagens[1])} alt="Screenshot 1"/>
                </figure>
                <figure>
                    <img src={jogoComplementaryData.imagens[2]} onClick={() => setImagemSelecionada(jogoComplementaryData.imagens[2])} alt="Screenshot 2"/>
                </figure>
            </div>
            <div className={style.grid}>
                <figure>
                    <img src={jogoComplementaryData.imagens[3]} onClick={() => setImagemSelecionada(jogoComplementaryData.imagens[3])} alt="Screenshot 1"/>
                </figure>
                <figure>
                    <img src={jogoComplementaryData.imagens[4]} onClick={() => setImagemSelecionada(jogoComplementaryData.imagens[4])} alt="Screenshot 2"/>
                </figure>
            </div>
        </section>
    )
}