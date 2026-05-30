import { useRouter } from 'next/router'
import cabecalhoStyle from '../style/cabecalho.module.css'
import Link from 'next/link'
const navBar = [
    {pagina: 'Recomendados', caminho: '/recomendado'},
    {pagina: 'Categorias', caminho: '/categorias'},
    {pagina: 'Distruir', caminho: '/distribuir'},
]

export default function Cabecalho(){
    const router = useRouter()

    return (
    <header className={cabecalhoStyle.header}>
        <span className={cabecalhoStyle.gameblog}>gameblog</span>
        <nav className={cabecalhoStyle.navLinks}>
            {navBar.map(pg => {
                const isActive = router.pathname === pg.caminho
                console.log(isActive)
                return(
                <div key={pg.caminho} className={`${cabecalhoStyle.divLink} ${isActive ? cabecalhoStyle.divLinkActive : cabecalhoStyle.divLinkUnactive}`}>
                    <img src='/assets/flecha_baixo.svg'/>
                    <Link className={cabecalhoStyle.Link} href={pg.caminho}>{pg.pagina}</Link>
                </div>
                )
            })}
        </nav>
        
        <div className={cabecalhoStyle.sidePannel}>
            <button className={cabecalhoStyle.alterMode}><img src='/assets/alterMode.svg'/></button>
            <form className={cabecalhoStyle.busca}>
                <input className={cabecalhoStyle.inputBusca} type='text' name='pesquisa' placeholder='Pesquisar na Loja'/> 
                <button><img className={cabecalhoStyle.pesquisarIcon}src='/assets/pesquisar.svg'/></button>
            </form>
        </div>
    </header>
    )
}
// Alterar placeholder da linha 16 depois para melhor acessibilidade