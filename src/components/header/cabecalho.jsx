import { useRouter } from 'next/router'
import style from '../../style/cabecalho/cabecalho.module.css'
import Link from 'next/link'
import SidePannel from './sidePannel'
const navBar = [
    {pagina: 'Recomendados', caminho: '/recomendado'},
    {pagina: 'Categorias', caminho: '/categorias'},
    {pagina: 'Distruir', caminho: '/distribuir'},
    {pagina: 'Login', caminho: '/login'},
]

export default function Cabecalho(){
    const router = useRouter()

    return (
    <header className={style.header}>
        <span className={style.gameblog}>gameblog</span>
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