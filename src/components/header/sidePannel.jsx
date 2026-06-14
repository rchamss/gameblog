'use client';

import { useEffect, useState } from 'react';
import style from '../../style/components/header/sidePannel.module.css'

export default function SidePannel(){
    const [theme, setTheme] = useState('dark');

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
                <img src={theme === 'dark' ? '/assets/alterMode.svg' : '/assets/alterModeDark.svg'}/>
            </button>
            <form className={style.busca}>
                <input className={style.inputBusca} type='text' name='pesquisa' placeholder='Pesquisar na Loja'/> 
                <button><img className={style.pesquisarIcon} src='/assets/pesquisar.svg'/></button>
            </form>
        </div>
    )
}