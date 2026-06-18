import { useContext } from "react";
import { JogoContext } from "../../../pages/jogo/[id]";
import style from "../../style/components/jogo/gamePrice.module.css"
import useAddCarrinho from "../../hooks/Api/protected/useAddCarrinho";
import {useRouter} from "next/router";

export default function GamePrice({jogoAPI}){
    const {jogo} = useContext(JogoContext)
    const router = useRouter()
    const {addCarrinho} = useAddCarrinho()

    if(jogo){ //Retorno na pagina do jogo
        return(
        <div className={style.priceBG}>
            <div>
                <button className={style.butao} onClick={() => addCarrinho(jogo.id)}>
                    Adicionar ao Carrinho
                    <img className={style.carrinho} src="/assets/carrinhoCompras.svg" alt="Adicionar ao carrinho de Compras"/>
                </button>
            </div>
            <h2>R${jogo.preco}</h2>
        </div>
        )
    }
    else{ //Retorno fora da pagina do jogo
        return(
        <div className={style.priceBG}>
            <div>
                <button className={style.butao} onClick={() => router.push(`/jogo/${jogoAPI.nome}`)}>
                    Adicionar ao Carrinho
                    <img className={style.carrinho} src="/assets/carrinhoCompras.svg" alt="Adicionar ao carrinho de Compras"/>
                </button>
            </div>
            <h2>R${jogoAPI.preco}</h2>
        </div>
        )
    }
}