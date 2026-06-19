import React, { useContext, useState } from 'react';
import style from '../../style/components/carrinho/carrinhoCheckout.module.css';
import { CarrinhoContext } from '../../../pages/carrinho';
import useBuscarJogos from '../../hooks/Api/protected/useBuscarJogos';
import useAddFinalizarCompra from "../../hooks/Api/protected/useAddFinalizarCompra";
import { useRouter } from 'next/router';

export default function CarrinhoCheckout({ onClose }) {
    const carrinho = useContext(CarrinhoContext);
    const listaJogos = useBuscarJogos();
    const {endCarrinho} = useAddFinalizarCompra()
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const router = useRouter()

    const itens = carrinho?.carrinho?.itens || [];

    const total = itens.reduce((acc, item) => {
        const jogo = listaJogos.find((j) => j.id === Number(item.fkJogo));
        return acc + (jogo ? Number(jogo.preco) : 0);
    }, 0);

    const handleConfirmar = () => {
        if (!metodoPagamento) {
            alert("Por favor, selecione uma forma de pagamento.");
            return;
        }
        // Aqui entrará o hook futuro de processar a venda na API
        endCarrinho(metodoPagamento);
        router.push('/biblioteca')
    };

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <header className={style.header}>
                    <h2 className={style.titulo}>CONFIRMAR COMPRA</h2>
                    <button className={style.botaoFechar} onClick={onClose}>X</button>
                </header>

                <div className={style.conteudo}>
                    <section className={style.secao}>
                        <h3 className={style.subtitulo}>Revisão dos Itens</h3>
                        <div className={style.listaJogos}>
                            {itens.map((item) => {
                                const jogo = listaJogos.find((j) => j.id === Number(item.fkJogo));
                                if (!jogo) return null;
                                return (
                                    <div key={item.id} className={style.itemResumo}>
                                        <span>{jogo.nome}</span>
                                        <strong>R$ {jogo.preco}</strong>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className={style.secao}>
                        <h3 className={style.subtitulo}>Forma de Pagamento</h3>
                        <div className={style.opcoesPagamento}>
                            {['PIX', 'Cartão de Crédito', 'Boleto'].map((metodo) => (
                                <label
                                    key={metodo}
                                    className={`${style.opcaoCard} ${metodoPagamento === metodo ? style.selecionado : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="pagamento"
                                        value={metodo}
                                        checked={metodoPagamento === metodo}
                                        onChange={(e) => setMetodoPagamento(e.target.value)}
                                        className={style.radioOculto}
                                    />
                                    {metodo}
                                </label>
                            ))}
                        </div>
                    </section>
                </div>

                <footer className={style.footer}>
                    <div className={style.totalInfo}>
                        <span>Total a pagar:</span>
                        <h2>R$ {total.toFixed(2)}</h2>
                    </div>
                    <button
                        className={style.botaoConfirmar}
                        onClick={handleConfirmar}
                        disabled={!metodoPagamento}
                    >
                        Concluir Pedido
                    </button>
                </footer>
            </div>
        </div>
    );
}