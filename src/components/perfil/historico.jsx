import { useState } from "react";
import style from "../../style/components/perfil/historico.module.css";
import useBuscarCarrinhos from "../../hooks/Api/protected/useBuscarCarrinhos";
import useBuscarJogos from "../../hooks/Api/protected/useBuscarJogos";

export default function HistoricoCompras() {
    const [ativo, setAtivo] = useState(false);

    const respostaCarrinhos = useBuscarCarrinhos();
    const listaJogos = useBuscarJogos() || [];

    const historico = respostaCarrinhos?.carrinhosComItens || [];
    const comprasFinalizadas = historico.filter((carrinho) => carrinho.status === 'F');

    return (
        <section className={`${style.background} ${ativo ? style.aberto : style.fechado}`}>
            <h1 onClick={() => setAtivo(!ativo)}>
                Histórico de Compras
            </h1>

            <div className={style.conteudoAnimado}>
                {!respostaCarrinhos || listaJogos.length === 0 ? (
                    <p>Carregando histórico...</p>
                ) : comprasFinalizadas.length === 0 ? (
                    <p>Nenhuma compra encontrada.</p>
                ) : (
                    comprasFinalizadas.map((carrinho) => {
                        let totalCompra = 0;
                        
                        const nomesJogos = carrinho.itens.map((item) => {
                            const jogoEncontrado = listaJogos.find((j) => j.id === Number(item.fkJogo));
                            if (jogoEncontrado) {
                                totalCompra += Number(jogoEncontrado.preco);
                                return jogoEncontrado.nome;
                            }
                            return "Jogo Desconhecido";
                        });

                        return (
                            <article key={carrinho.id}>
                                <p>
                                    <strong>Pedido #{carrinho.id}</strong> | R$ {totalCompra.toFixed(2).replace('.', ',')}
                                </p>
                                <p>Itens: {nomesJogos.join(', ')}</p>
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );
}