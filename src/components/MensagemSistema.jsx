import { useContext, useEffect, useState } from "react"
import style from '../style/systemMensagem.module.css'

const CONFIG = {
  200: { icone: '/icons/valido.svg',   cor: '#4CAF50', borda: '#1a3a5c'},
  201: { icone: '/icons/valido.svg',   cor: '#4CAF50', borda: '#1a3a5c'},
  204: { icone: '/icons/info.svg',    cor: '#2196F3', borda: '#1a2a3a'},
  403: { icone: '/icons/error.svg',    cor: '#FF5722', borda: '#3a1a1a'},
  401: { icone: '/icons/error.svg',    cor: '#FF5722', borda: '#3a1a1a'},
  404: { icone: '/icons/error.svg',  cor: '#FF5722', borda: '#3a1a1a'},
}
export default function MensagemSistema({status, mensagem, onClose}){
    const config = CONFIG[status] ?? CONFIG[404] 
    return(
        <output className={style.output} style={{borderColor: config.borda, backgroundColor: config.cor}}>
            <img src={config.icone}/>
            <span>{mensagem}</span>
            <button onClick={onClose}>✕</button>
        </output>
    )
}