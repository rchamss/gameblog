'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import style from '../../style/components/header/sidePannel.module.css';
import PerfilUsuario from "./PerfilUsuario";
import useBuscarCarrinhoAtivo from "../../hooks/Api/protected/useBuscarCarrinhoAtivo";
import { apiPath } from '../../../infra/api';

export default function SidePannel() {
    const [theme, setTheme] = useState('dark');
    const carrinhoAtivo = useBuscarCarrinhoAtivo();
    const quantidadeItens = carrinhoAtivo?.carrinho?.itens?.length || 0;
    
    const [busca, setBusca] = useState('');
    const [opcoes, setOpcoes] = useState([]);
    const [dadosCompletos, setDadosCompletos] = useState({ jogos: [], empresas: [] });
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'dark';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);

        buscarDadosParaPesquisa();
    }, []);

    const buscarDadosParaPesquisa = async () => {
        try {
            const resJogos = await fetch(`${apiPath}/public/jogos`);
            const jogos = resJogos.ok ? await resJogos.json() : [];

            const token = localStorage.getItem('token');
            let empresas = [];
            
            if (token) {
                const resEmpresas = await fetch(`${apiPath}/empresas`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (resEmpresas.ok) {
                    empresas = await resEmpresas.json();
                }
            }

            setDadosCompletos({ jogos, empresas });
        } catch (error) {
            console.error("Erro na carga inicial do autocomplete:", error);
        }
    };

    useEffect(() => {
        if (busca.trim().length === 0) {
            setOpcoes([]);
            return;
        }

        const termo = busca.toLowerCase();
        
        const jogosFiltrados = dadosCompletos.jogos
            .filter(j => j.nome.toLowerCase().includes(termo))
            .map(j => ({ ...j, tipo: 'jogo' }));

        const empresasFiltradas = dadosCompletos.empresas
            .filter(e => e.nome.toLowerCase().includes(termo))
            .map(e => ({ ...e, tipo: 'empresa' }));

        const resultados = [...jogosFiltrados, ...empresasFiltradas].slice(0, 3);
        setOpcoes(resultados);
    }, [busca, dadosCompletos]);

    function toggleTheme() {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }

    const handleSelecionar = (item) => {
        setBusca('');
        setOpcoes([]);

        if (item.tipo === 'jogo') {
            router.push(`/jogo/${item.nome}`); 
        } else {
            router.push(`/empresa/${item.nome}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (opcoes.length > 0) {
            handleSelecionar(opcoes[0]);
        }
    };

    return (
        <div className={style.sidePannel}>
            <button className={style.alterMode} onClick={toggleTheme}>
                <img src={theme === 'dark' ? '/assets/alterMode.svg' : '/assets/alterModeDark.svg'} alt="Alternar Tema"/>
            </button>

            <Link href="/carrinho" className={style.carrinhoContainer}>
                <img src='/assets/carrinhoCompras.svg' alt='Carrinho' className={style.carrinhoIcon} />
                {quantidadeItens > 0 && (
                    <span className={style.carrinhoBadge}>{quantidadeItens}</span>
                )}
            </Link>

            <form className={style.busca} onSubmit={handleSubmit}>
                <input 
                    className={style.inputBusca} 
                    type='text' 
                    name='pesquisa' 
                    placeholder='Pesquisar na Loja'
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    autoComplete="off"
                />
                <button type="submit">
                    <img className={style.pesquisarIcon} src='/assets/pesquisar.svg' alt="Pesquisar"/>
                </button>

                {opcoes.length > 0 && (
                    <div className={style.dropdown}>
                        {opcoes.map((item, index) => (
                            <div 
                                key={`${item.tipo}-${index}`} 
                                className={style.dropdownItem}
                                onClick={() => handleSelecionar(item)}
                            >
                                <span>{item.nome}</span>
                                <span className={style.itemTipo}>{item.tipo}</span>
                            </div>
                        ))}
                    </div>
                )}
            </form>
            
            <PerfilUsuario />
        </div>
    );
}