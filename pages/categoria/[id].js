import style from "../../src/style/pages/jogo/[id].module.css"
import Carregamento from "../../src/components/loading";
import { useRouter } from "next/router"
import { useEffect } from "react";
import useAwaitLoading from "../../src/hooks/useAwaitLoading";
import { useRequireLogin } from "../../src/hooks/useRequireLogin";
import useBuscarJogos from "../../src/hooks/Api/protected/useBuscarJogos";
import useBuscarCategorias from "../../src/hooks/Api/protected/useBuscarCategorias";
import usePublicBuscarJogos from "../../src/hooks/Api/useBuscarJogos";
import Link from "next/link";
import { jogosData } from "../../src/data/complementaryData";
import GameCard from "../../src/components/categorias/gameCard";

export default function Jogo() {
    const router = useRouter()
    const paginaPronta = router.isReady

    const categorias = useBuscarCategorias()
    const dadosProntos = useAwaitLoading(categorias)
    const categoriaRequisitada = categorias.find((categoria) => categoria.nome.toLowerCase() === router.query.id.toLowerCase())

    const jogos = useBuscarJogos()
    
    const jogosCategoria = jogos.filter((jogo) => jogo.fkCategoria === categoriaRequisitada?.id)
    const jogosNomes = jogosCategoria.map((jogo) => jogo.nome)
    const jogosComplementaryData = jogosData.filter((jogo) => jogosNomes.includes(jogo.nome))

    if (paginaPronta && dadosProntos) {
        if (categoriaRequisitada) {
            return (
                <main>
                    <h1>Olá Mundo! Você esta na página de {categoriaRequisitada.nome}</h1>
                    {jogosCategoria.map((jogo) => 
                        <GameCard 
                            jogoAPI={jogo} 
                            categoria={categoriaRequisitada} 
                            dadosComplementares={jogosComplementaryData.find((complementar) => complementar.nome === jogo.nome)}/>)}
                </main>
            )
        }
        else { 
            return (
                <main className={style.notFound}>
                    <div className={style.iconeContainer}>
                        <img src="/assets/404.svg"/>
                    </div>
                    <h1>Oops!</h1>
                    <p>Não encontramos nada aqui. Tem certeza que veio no lugar certo?</p>
                </main>
            )
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