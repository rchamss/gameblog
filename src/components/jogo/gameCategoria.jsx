import { useContext } from "react";
import { JogoContext } from "../../../pages/jogo/[id]";

export default function GameCategoria(){
    const {jogo} = useContext(JogoContext)
    return (
        <div>
            <span>Categoria: </span>
            <div>
                {jogo.categoria}
            </div>
        </div>
    )
}