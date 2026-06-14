import style from '../../style/components/header/sidePannel.module.css'

export default function SidePannel(){
    return(
        <div className={style.sidePannel}>
            <button className={style.alterMode}><img src='/assets/alterMode.svg'/></button>
            <form className={style.busca}>
                <input className={style.inputBusca} type='text' name='pesquisa' placeholder='Pesquisar na Loja'/> 
                <button><img className={style.pesquisarIcon}src='/assets/pesquisar.svg'/></button>
            </form>
        </div>
    )
}