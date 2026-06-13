import style from "../../src/style/pages/jogo/[id].module.css"
import Carregamento from "../../src/components/loading";
import { useRequestJogos } from "../../src/hooks/useRequestAPI";
import { useRouter } from "next/router"
import { jogosData } from "../../src/data/complementaryData";
import { useEffect } from "react";
import useAwaitLoading from "../../src/hooks/useAwaitLoading";

export default function Jogo() {
    const jogosLista = useRequestJogos() 
    const dadosProntos = useAwaitLoading(jogosLista)
    const router = useRouter()
    const paginaPronta = router.isReady
    const jogo = jogosLista.find((item) => item.nome.toLowerCase() === router.query.id.toLowerCase())
    const jogoComplementaryData = jogosData.find((item) => item.nome.toLowerCase() === jogo?.nome.toLowerCase())
    
    if (paginaPronta && dadosProntos) {
        if (jogo) {
            return (
                <div>
                    <h1>Você está na página do jogo {jogo.nome}!</h1>
                    <img src={jogoComplementaryData.capa}/>
                </div>
            )
        }
        else{
             return <h1>ERRRO 404!</h1> 
        }
    }
    else{
        return (
            <div className={style.container_carregamento}>
                <Carregamento /> 
            </div>
        )
    }
    
}