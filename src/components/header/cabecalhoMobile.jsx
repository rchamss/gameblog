'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from '../../style/components/header/cabecalhoMobile.module.css';
import PerfilUsuario from './PerfilUsuario';

import { navBar } from './cabecalho';

export default function CabecalhoMobile() {
    const router = useRouter();
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <footer className={style.footerNav}>
            {menuAberto && (
                <nav className={style.menuAberto}>
                    {navBar.map(pg => {
                        const isActive = router.pathname === pg.caminho
                        return (
                            <Link
                                key={pg.caminho}
                                href={pg.caminho}
                                className={`${style.link} ${isActive ? style.linkActive : style.linkInactive}`}
                                onClick={() => setMenuAberto(false)}
                            >
                                {pg.pagina}
                            </Link>
                        )
                    })}
                </nav>
            )}
            <div className={style.barra}>
                <button className={style.menuBtn} onClick={() => setMenuAberto(!menuAberto)}>
                    ☰
                </button>
                <input className={style.inputBusca} type='text' placeholder='Pesquisar na Loja...' />
                <PerfilUsuario />
            </div>
        </footer>
    )
}

