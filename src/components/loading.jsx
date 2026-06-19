import { useState, useEffect } from 'react';
import style from '../style/loading.module.css';

const mensagens = [
    "Buscando informações...",
    "Preparando a interface...",
    "Processando os dados...",
    "Só mais um momento..."
];

export default function Carregamento() {
    const [esperaLonga, setEsperaLonga] = useState(false);
    const [mensagemIndex, setMensagemIndex] = useState(0);

    // ⏱️ Controle de 1 segundo
    useEffect(() => {
        const timerUmSegundo = setTimeout(() => {
            setEsperaLonga(true);
        }, 1000);

        return () => clearTimeout(timerUmSegundo);
    }, []);

    // 💬 Inicia as mensagens dinâmicas apenas se a espera for longa
    useEffect(() => {
        let interval;
        if (esperaLonga) {
            interval = setInterval(() => {
                setMensagemIndex((prev) => (prev + 1) % mensagens.length);
            }, 1200); // Troca a frase a cada 1.2s
        }

        return () => clearInterval(interval);
    }, [esperaLonga]);

    return (
        <main className={style.container}>
            <div className={style.loaderBox}>
                
                <h3 className={style.mensagem}>
                    {!esperaLonga ? "Carregando componente..." : mensagens[mensagemIndex]}
                </h3>
                
                <div className={style.barraFundo}>
                    <div className={style.barraProgresso}></div>
                </div>
            </div>
        </main>
    );
}