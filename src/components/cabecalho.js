import cabecalhoStyle from '../style/cabecalho.module.css'
import Link from 'next/link'

export default function Cabecalho(){    
    return (
    <header className={cabecalhoStyle.header}>
        <span className={cabecalhoStyle.gameblog}>gameblog</span>
        <nav className={cabecalhoStyle.navLinks}>
            <div className={cabecalhoStyle.divLink}>
                <img src='/assets/flecha_baixo.svg' />
                <Link className={cabecalhoStyle.Link} href='/recomendado'>
                Recomendado
                </Link>
            </div>
            <div className={cabecalhoStyle.divLink}>
                <img src='/assets/flecha_baixo.svg'/>
                <Link className={cabecalhoStyle.Link} href='/categorias'>
                Categorias
                </Link>
            </div>
            <div className={cabecalhoStyle.divLink}>
                <img src='/assets/flecha_baixo.svg'/>
                <Link className={cabecalhoStyle.Link} href='/distribuir'>
                Distribuir
                </Link>
            </div>
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