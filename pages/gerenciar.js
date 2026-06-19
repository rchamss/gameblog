import { useState, useEffect } from "react";
import { apiPath } from "../infra/api";
import { useRequireLogin } from "../src/hooks/useRequireLogin";
import useUpdateJogo from "../src/hooks/Api/protected/useUpdateJogo";
import useUpdateEmpresa from "../src/hooks/Api/protected/useUpdateEmpresa";

// Importando o CSS Module criado
import styles from "../src/style/pages/gerenciar.module.css";

export default function Gerenciar() {
    const { token } = useRequireLogin();
    const { updateJogo } = useUpdateJogo();
    const { updateEmpresa } = useUpdateEmpresa();

    const [modalAtivo, setModalAtivo] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const [jogos, setJogos] = useState([]);

    const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
    const [jogoSelecionado, setJogoSelecionado] = useState(null);

    const [formEmpresa, setFormEmpresa] = useState({ nome: "" });
    const [formJogo, setFormJogo] = useState({ nome: "", ano: "", preco: "" });

    useEffect(() => {
        if (!token) return;

        async function carregarDados() {
            try {
                const resEmpresas = await fetch(`${apiPath}/empresas`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (resEmpresas.ok) {
                    const dados = await resEmpresas.json();
                    setEmpresas(dados);
                }

                const resJogos = await fetch(`${apiPath}/jogos`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (resJogos.ok) {
                    const dados = await resJogos.json();
                    setJogos(dados);
                }
            } catch (error) {
                console.error(error);
            }
        }

        carregarDados();
    }, [token, modalAtivo]);

    const abrirModal = (tipo) => {
        setModalAtivo(tipo);
        setEmpresaSelecionada(null);
        setJogoSelecionado(null);
        setFormEmpresa({ nome: "" });
        setFormJogo({ nome: "", ano: "", preco: "" });
    };

    const fecharModal = () => {
        setModalAtivo(null);
    };

    const handleSelectEmpresa = (id) => {
        const empresa = empresas.find(e => e.id === parseInt(id));
        setEmpresaSelecionada(empresa);
        setFormEmpresa({ nome: "" });
    };

    const handleSelectJogo = (id) => {
        const jogo = jogos.find(j => j.id === parseInt(id));
        setJogoSelecionado(jogo);
        setFormJogo({ nome: "", ano: "", preco: "" });
    };

    const salvarEmpresa = async (e) => {
        e.preventDefault();
        if (!empresaSelecionada) return;

        const nomeFinal = formEmpresa.nome || empresaSelecionada.nome;

        try {
            await updateEmpresa(empresaSelecionada.id, nomeFinal);
            fecharModal();
        } catch (error) {
            console.error(error);
        }
    };

    const salvarJogo = async (e) => {
        e.preventDefault();
        if (!jogoSelecionado) return;

        const dadosAtualizados = {
            nome: formJogo.nome || jogoSelecionado.nome,
            ano: formJogo.ano ? parseInt(formJogo.ano) : jogoSelecionado.ano,
            preco: formJogo.preco ? parseFloat(formJogo.preco) : jogoSelecionado.preco,
            fkCategoria: jogoSelecionado.fkCategoria,
            fkEmpresa: jogoSelecionado.fkEmpresa,
            descricao: jogoSelecionado.descricao,
            desconto: jogoSelecionado.desconto
        };

        try {
            await updateJogo(jogoSelecionado.id, dadosAtualizados);
            fecharModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Painel de Gerenciamento</h1>
            
            <div className={styles.botoesContainer}>
                <button className={styles.btnAction} onClick={() => abrirModal("empresa")}>Gerenciar Empresas</button>
                <button className={styles.btnAction} onClick={() => abrirModal("jogo")}>Gerenciar Jogos</button>
            </div>

            {/* MODAL DE EMPRESAS */}
            {modalAtivo === "empresa" && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Gerenciar Empresa</h2>
                        <form onSubmit={salvarEmpresa} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            
                            <div className={styles.formGroup}>
                                <label>Selecione a Empresa:</label>
                                <select 
                                    className={styles.selectField}
                                    onChange={(e) => handleSelectEmpresa(e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Escolha uma empresa...</option>
                                    {empresas.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name || emp.nome}</option>
                                    ))}
                                </select>
                            </div>

                            {empresaSelecionada && (
                                <>
                                    <div className={styles.formGroup}>
                                        <label>Nome da Empresa:</label>
                                        <input 
                                            type="text" 
                                            className={styles.inputField}
                                            placeholder={empresaSelecionada.name || empresaSelecionada.nome}
                                            value={formEmpresa.nome}
                                            onChange={(e) => setFormEmpresa({ nome: e.target.value })}
                                        />
                                    </div>
                                    <button className={styles.btnSave} type="submit">Salvar Alterações</button>
                                </>
                            )}
                            <button className={styles.btnCancel} type="button" onClick={fecharModal}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DE JOGOS */}
            {modalAtivo === "jogo" && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Gerenciar Jogo</h2>
                        <form onSubmit={salvarJogo} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            
                            <div className={styles.formGroup}>
                                <label>Selecione o Jogo:</label>
                                <select 
                                    className={styles.selectField}
                                    onChange={(e) => handleSelectJogo(e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Escolha um jogo...</option>
                                    {jogos.map(jog => (
                                        <option key={jog.id} value={jog.id}>{jog.nome}</option>
                                    ))}
                                </select>
                            </div>

                            {jogoSelecionado && (
                                <>
                                    <div className={styles.formGroup}>
                                        <label>Ano:</label>
                                        <input 
                                            type="number" 
                                            className={styles.inputField}
                                            placeholder={jogoSelecionado.ano}
                                            value={formJogo.ano}
                                            onChange={(e) => setFormJogo({ ...formJogo, ano: e.target.value })}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Preço:</label>
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            className={styles.inputField}
                                            placeholder={jogoSelecionado.preco}
                                            value={formJogo.preco}
                                            onChange={(e) => setFormJogo({ ...formJogo, preco: e.target.value })}
                                        />
                                    </div>

                                    <button className={styles.btnSave} type="submit">Salvar Alterações</button>
                                </>
                            )}
                            <button className={styles.btnCancel} type="button" onClick={fecharModal}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}