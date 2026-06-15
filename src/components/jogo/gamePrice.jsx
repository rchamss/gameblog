import { useContext } from "react";
import { JogoContext } from "../../../pages/jogo/[id]";
import style from "../../style/components/jogo/gamePrice.module.css"

export default function GamePrice(){
    const {jogo, jogoComplementaryData, jogoPublic} = useContext(JogoContext)

    return(
        <div className={style.priceBG}>
            <div>
                <button className={style.butao}>Comprar</button>
                <button className={style.butao}>
                    <img className={style.carrinho} src="/assets/carrinhoCompras.svg" alt="Adicionar ao carrinho de Compras"/>
                </button>
            </div>
            <h2>R${jogo.preco}</h2>
        </div>
    )
}