import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import style from '../../style/components/header/cabecalho.module.css'
import Link from 'next/link'
import SidePannel from './sidePannel'
import CabecalhoMobile from './cabecalhoMobile'

export const navBar = [
    {pagina: 'Recomendar Jogo', caminho: '/recomendado'},
    {pagina: 'Categorias', caminho: '/categorias'},
    {pagina: 'Sobre Nós', caminho: '/sobre'},
]

export default function Cabecalho(){
    const router = useRouter()

    return (
        <header className={style.header}>
            <Link href="/"><span className={style.gameblog}>gameblog</span></Link>
            <nav className={style.navLinks}>
                {navBar.map(pg => {
                    const isActive = router.pathname === pg.caminho
                    return(
                        <div key={pg.caminho} className={`${style.divLink} ${isActive ? style.divLinkActive : style.divLinkUnactive}`}>
                            <img src='/assets/flecha_baixo.svg'/>
                            <Link className={style.Link} href={pg.caminho}>{pg.pagina}</Link>
                        </div>
                    )
                })}
            </nav>
            <SidePannel/>
        </header>
    )
}

// Alterar placeholder da linha 16 depois para melhor acessibilidade