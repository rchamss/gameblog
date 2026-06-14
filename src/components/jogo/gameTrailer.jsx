import style from "../../style/components/jogo/gameTrailer.module.css"

export default function GameTrailer({src}){
    return(
        <div className={style.container_gametrailer}>
            <iframe src={`${src}&autoplay=1&mute=1&rel=0`}
                    title="Trailer do Jogo" 
                    loading="lazy"
                    allowFullScreen
                    className={style.gametrailer}>               
            </iframe>
        </div>
    )
}