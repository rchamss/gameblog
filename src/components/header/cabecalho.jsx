import { useRouter } from 'next/router'
import style from '../../style/components/header/cabecalho.module.css'
import Link from 'next/link'
import SidePannel from './sidePannel'
import useBuscarUsuario from "../../hooks/Api/protected/useBuscarUsuario";
import PerfilUsuario from "./PerfilUsuario";
const navBar = [
    {pagina: 'Recomendados', caminho: '/recomendado'},
    {pagina: 'Categorias', caminho: '/categorias'},
    {pagina: 'Distruir', caminho: '/distribuir'},
    {pagina: 'index', caminho: '/'},
]

export default function Cabecalho(){
    const router = useRouter()
    const user = useBuscarUsuario()
    
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