import React, { createContext, useState } from 'react';
import style from '../src/style/pages/carrinho.module.css';
import CarrinhoResumo from "../src/components/carrinho/carrinhoResumo";
import useBuscarCarrinhoAtivo from "../src/hooks/Api/protected/useBuscarCarrinhoAtivo";
import CarrinhoJogo from "../src/components/carrinho/carrinhoJogo";
import { useRouter } from "next/router";
import useAwaitLoading from "../src/hooks/useAwaitLoading";
import Carregamento from "../src/components/loading";
import CarrinhoCheckout from "../src/components/carrinho/carrinhoCheckout";
import Head from 'next/head';

export const CarrinhoContext = createContext();

export default function Carrinho() {
    const carrinho = useBuscarCarrinhoAtivo();
    const dadosProntos = useAwaitLoading(carrinho);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const carregando = carrinho === undefined;
    const temItens = carrinho?.carrinho?.itens && carrinho.carrinho.itens.length > 0;


    if (!dadosProntos) return 

    return (
        <CarrinhoContext value={carrinho}>
            <main className={style.container}>
                <Head>
                    <title>Carrinho de Compras</title>
                </Head>
                <h1 className={`${style.tituloPagina} ${style.animarTitulo}`}>MEU CARRINHO</h1>

                {carregando ? (
                    <div className={style.textoCarregando}>Carregando seu carrinho...</div>
                ) : !temItens ? (
                    <div className={style.carrinhoVazioContainer}>
                        <p>Parece que não tem nada no seu carrinho. Que tal descobrir algo novo?</p>
                        <button className={style.botaoDescobrir} onClick={() => router.push('/recomendado')}>
                            Descobrir Jogos
                        </button>
                    </div>
                ) : (
                    <div className={style.conteudo}>
                        <section className={style.colunaEsquerda}>
                            {carrinho?.carrinho?.itens?.map((item, index) => (
                                <CarrinhoJogo key={item.id} item={item} index={index} />
                            ))}
                        </section>

                        <aside className={`${style.colunaDireita} ${style.animarDireita}`}>
                            <CarrinhoResumo abrirModal={() => setIsModalOpen(true)} />
                        </aside>
                    </div>
                )}
            </main>

            {isModalOpen && (
                <CarrinhoCheckout onClose={() => setIsModalOpen(false)} />
            )}
        </CarrinhoContext>
    );
}