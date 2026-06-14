import { useContext, useEffect, useState } from "react"
import style from '../style/systemMensagem.module.css'

const CONFIG = {
  200: { icone: '/icons/valido.svg',   cor: '#095522', borda: '#02AC3B'},
  201: { icone: '/icons/valido.svg',   cor: '#095522', borda: '#02AC3B'},
  204: { icone: '/icons/info.svg',    cor: '#095522', borda: '#02AC3B'},
  403: { icone: '/icons/error.svg',    cor: '#511301', borda: '#AC2A02'},
  401: { icone: '/icons/error.svg',    cor: '#511301', borda: '#AC2A02'},
  404: { icone: '/icons/error.svg',  cor: '#511301', borda: '#AC2A02'},
}
export default function MensagemSistema({status, mensagem, onClose}){
    const config = CONFIG[status] ?? CONFIG[404] 
    return(
        <output className={style.output} style={{borderColor: config.borda, backgroundColor: config.cor}}>
            <div>
                <img src={config.icone}/>
                <span>{mensagem}</span>
            </div>
            <button onClick={onClose}>✕</button>
        </output>
    )
}