import { useContext } from "react";
import { JogoContext } from "../../../pages/jogo/[id]";
import style from "../../style/components/jogo/gamePrice.module.css"

export default function GamePrice({jogoAPI}){
    const {jogo, jogoComplementaryData, jogoPublic} = useContext(JogoContext)
    console.log(jogoAPI)

    if(jogo){
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
    else{
        return(
        <div className={style.priceBG}>
            <div>
                <button className={style.butao}>Comprar</button>
                <button className={style.butao}>
                    <img className={style.carrinho} src="/assets/carrinhoCompras.svg" alt="Adicionar ao carrinho de Compras"/>
                </button>
            </div>
            <h2>R${jogoAPI.preco}</h2>
        </div>
        )
    }
}