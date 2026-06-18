'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import style from '../../style/components/header/sidePannel.module.css';
import PerfilUsuario from "./PerfilUsuario";
import useBuscarCarrinhoAtivo from "../../hooks/Api/protected/useBuscarCarrinhoAtivo";

export default function SidePannel(){
    const [theme, setTheme] = useState('dark');
    const carrinhoAtivo = useBuscarCarrinhoAtivo();
    const quantidadeItens = carrinhoAtivo?.carrinho?.itens?.length || 0;

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'dark';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    function toggleTheme() {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }

    return(
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

            <form className={style.busca}>
                <input className={style.inputBusca} type='text' name='pesquisa' placeholder='Pesquisar na Loja'/>
                <button><img className={style.pesquisarIcon} src='/assets/pesquisar.svg' alt="Pesquisar"/></button>
            </form>
            <PerfilUsuario/>
        </div>
    )
}