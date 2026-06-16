import Link from "next/link";
import style from "../../style/components/categorias/gameCard.module.css"
import GamePrice from "../jogo/gamePrice";

export default function GameCard({jogoAPI, categoria, dadosComplementares}){
    console.log(jogoAPI)
    return(
        <div className={style.center}>
            <article className={style.card_bg}>
                <img src={dadosComplementares.capa} className={style.capa}/>
                    <div className={style.gameDados}>
                        <Link href={`/jogo/${jogoAPI.nome}`} className={style.link_container}>
                                <h1>{jogoAPI.nome}</h1>
                                <p>{jogoAPI.descricao}</p>
                                <p>{dadosComplementares.descrição}</p>
                                <span className={style.categoria}>{categoria.nome}</span>
                        </Link>
                        <GamePrice jogoAPI={jogoAPI}/>
                    </div>
            </article>
        </div>
    )
}