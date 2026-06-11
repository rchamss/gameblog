import { useContext, useEffect, useState } from "react"
import style from '../style/systemMensagem.module.css'
import { MensagemContext } from "../../pages/_app"

export default function SystemMensagem({tipo, mensagem, tempo = 4000}){
    const [icon, setIcon] = useState(null) // Define qual o icone da imagem da mensagem
    const [visivel, setVisivel] = useState(false)
    const {setChamado} = useContext(MensagemContext)

    useEffect(() => {
        setVisivel(true)
        const timer = setTimeout(() => (setVisivel(false)), tempo)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    if (!visivel) return null

    return(
        <output className={style.output}>
            <img src='/icon_valid.svg'/>
            <span>{mensagem}</span>
        </output>
    )
}