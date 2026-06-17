import { useState } from 'react';
import Link from "next/link";
import style from "../../style/components/categorias/gameCard.module.css"
import GamePrice from "../jogo/gamePrice";
import useBuscarAvaliacoes from "../../hooks/Api/protected/useBuscarAvaliacoes";
import GameAvaliacoes from "../jogo/gameAvaliacoes";

export default function GameCard({jogoAPI, categoria, dadosComplementares}){
    const [expandido, setExpandido] = useState(false)
    const estrelas = useBuscarAvaliacoes(jogoAPI.id)
    return(
        <div className={style.center}>
            <article className={style.card_bg}>
                <Link href={`/jogo/${jogoAPI.nome}`}>
                    <img src={dadosComplementares.capa} className={style.capa}/>
                </Link>
                    <div className={style.gameDados}>
                        <Link href={`/jogo/${jogoAPI.nome}`}>
                                <h1>{jogoAPI.nome}</h1>
                                <p>{jogoAPI.descricao}</p>
                                <button className={style.lerMais} onClick={(e) => { e.preventDefault(); setExpandido(!expandido) }}>
                                  {expandido ? 'Ler menos' : 'Ler mais'}
                                </button>
                                <p className={`${style.descricao} ${expandido ? style.expandido : ''}`}>{dadosComplementares.descrição}</p>
                                <span className={style.categoria}>{categoria.nome}</span>
                                <GameAvaliacoes nota={estrelas.media} quantidadeAvaliacoes={estrelas.totalAvaliacoes}/>
                        </Link>
                        <GamePrice jogoAPI={jogoAPI}/>
                    </div>
            </article>
        </div>
    )
}