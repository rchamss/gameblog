import { useContext } from "react";
import { MensagemContext } from "../../pages/_app";

export default function useSystemMensage(){
    const {chamado, setChamado} = useContext(MensagemContext)

    function callSystemMensagem(status, mensagem){
        setChamado({tipo: status, texto: mensagem})
        const timer = setTimeout(() => (setChamado(null)), 4000)
        return () => clearTimeout(timer)
    }

    return {callSystemMensagem}
}