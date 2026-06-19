import React, { useContext } from 'react';
import style from '../../style/components/carrinho/carrinhoResumo.module.css';
import { CarrinhoContext } from '../../../pages/carrinho';
import useBuscarJogos from '../../hooks/Api/protected/useBuscarJogos';
import useAwaitLoading from "../../hooks/useAwaitLoading";
import Carregamento from "../loading";

// 👈 Recebe a função 'abrirModal' via props
export default function CarrinhoResumo({ abrirModal }) {
    const carrinho = useContext(CarrinhoContext);
    const dadosProntos = useAwaitLoading(carrinho);
    const listaJogos = useBuscarJogos() || [];

    const itens = carrinho?.carrinho?.itens || [];

    const subtotal = itens.reduce((acc, item) => {
        const jogo = listaJogos.find((j) => j.id === Number(item.fkJogo));
        return acc + (jogo ? Number(jogo.preco) : 0);
    }, 0);

    const descontos = 0;
    const total = subtotal - descontos;

    if (!dadosProntos) return <Carregamento/>

    return (
        <div className={`${style.resumoCard} ${style.animacaoEntrada}`}>
            <h2>Resumo da Compra</h2>
            <hr className={style.divisor} />

            <div className={style.linhaResumo}>
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className={style.linhaResumo}>
                <span>Descontos</span>
                <span>R$ {descontos.toFixed(2).replace('.', ',')}</span>
            </div>

            <hr className={style.divisor} />

            <div className={style.linhaTotal}>
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>

            <button
                className={style.botaoFinalizar}
                onClick={abrirModal}
                disabled={itens.length === 0}
            >
                Continuar Compra
            </button>
        </div>
    );
}