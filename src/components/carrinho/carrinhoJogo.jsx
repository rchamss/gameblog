import Link from "next/link";
import style from "../../style/components/carrinho/carrinhoJogo.module.css"
import useBuscarJogos from "../../hooks/Api/protected/useBuscarJogos";
import {jogosData} from "../../data/complementaryData";
import Carregamento from "../loading";
import useBuscarCategorias from "../../hooks/Api/protected/useBuscarCategorias";
import useRemoveCarrinho from "../../hooks/Api/protected/useRemoveCarrinho";
import {useState} from "react";

export default function CarrinhoJogo({ item, index }){
    const { rmCarrinho } = useRemoveCarrinho();
    const [onCarrinho, setOnCarrinho] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    const listaJogos = useBuscarJogos() || [];
    const listaCategorias = useBuscarCategorias() || [];

    if (!item || !item.fkJogo) return null;

    const jogo = listaJogos.find((j) => j.id === Number(item.fkJogo));
    const categoria = listaCategorias.find((c) => c.id === Number(jogo?.fkCategoria));

    const dadosComplementares = jogosData.find(
        (g) => g.nome.toLowerCase() === jogo?.nome?.toLowerCase()
    );

    if (!jogo || !categoria || !dadosComplementares) {
        return <Carregamento/>
    }

    if (!onCarrinho) return null;

    const handleRemover = async () => {
        await rmCarrinho(jogo.id);
        setOnCarrinho(false);
    };

    return(
        <article className={`${style.card_bg} ${style.animacaoEntrada}`} style={{ animationDelay: `${index * 0.15}s` }}>
            <Link href={`/jogo/${jogo.nome}`}>
                <img src={dadosComplementares.capa} className={style.capa} alt="Capa do Jogo"/>
            </Link>

            <section className={style.infoContainer}>
                <Link href={`/jogo/${jogo.nome}`} className={style.textos}>
                    <h1>{jogo.nome}</h1>
                    <span className={style.categoria}>{categoria.nome}</span>
                    <h2>R$ {jogo.preco}</h2>
                </Link>

                <div className={style.acaoContainer}>
                    {!showConfirm ? (
                        <button
                            className={`${style.botaoPadrao} ${style.botaoRemover}`}
                            onClick={() => setShowConfirm(true)}
                        >
                            Remover
                        </button>
                    ) : (
                        <div className={style.confirmacao}>
                            <span className={style.pergunta}>Tem certeza?</span>
                            <div className={style.botoesConfirmacao}>
                                <button
                                    className={`${style.botaoPadrao} ${style.botaoConfirmar}`}
                                    onClick={handleRemover}
                                >
                                    Sim
                                </button>
                                <button
                                    className={`${style.botaoPadrao} ${style.botaoCancelar}`}
                                    onClick={() => setShowConfirm(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </article>
    )
}