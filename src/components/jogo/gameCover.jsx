export default function GameHeroe({jogoComplementaryData, children}){
    return(
        <div className={style.container_heroe}>
            <img src={jogoComplementaryData.heroe} className={style.heroe}/>
            { children }
        </div>
    )
}