import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import style from '../src/style/pages/sobre.module.css';
// 🌌 Importação dos dados complementares para pegar o Hero real
import { jogosData } from '../src/data/complementaryData'; 

const equipe = [
    { id: 2, nome: "Suleiman Al-Qahtani", titulo: "git commit acts of violance", descricao: "Não aguento mais escrever npm run dev", foto: "/sobreNos/su.png" },
    { id: 1, nome: "Rodrigo Chamusca", titulo: "Líder do gameblog team!", descricao: `Gemini, ative o mega brain`, foto: "/sobreNos/rodrigo.png" },
    { id: 3, nome: "Rafael Ahmad Fonseca", titulo: "Mr. Responsividade", descricao: "Tudo parece impossível até que seja feito.", foto: "/sobreNos/rafa.png" },
    { id: 4, nome: "Tiago Eziquiel de Souza", titulo: "Absolute Data Collector", descricao: "Git commit -m “tentando aprender”", foto: "/sobreNos/tiago.png" },
    { id: 5, nome: "Camila Sá Longa", titulo: "Advogada do usuário", descricao: "Garantindo que os desenvolvedores não se empolguem", foto: "/sobreNos/camila.png" },
    { id: 6, nome: "Cauã Leão Mendes", titulo: "Operação Tela Ajustada", descricao: "Com grandes poderes vêm grandes responsabilidades (e muitas Media Queries)", foto: "/sobreNos/caua.png" },
];

function MembroCard({ membro, index }) {
    const [animando, setAnimando] = useState(false);

    const handleCliqueLudico = () => {
        if (animando) return;
        setAnimando(true);
        setTimeout(() => setAnimando(false), 800);
    };

    return (
        <article 
            className={`${style.card} ${style.animacaoEntrada} ${style.animacaoIdle}`}
            style={{ animationDelay: `${index * 0.1}s`, '--idle-delay': `${index * 0.4}s` }}
        >
            <div 
                className={`${style.fotoWrapper} ${animando ? style.fotoClicada : ''}`} 
                onClick={handleCliqueLudico}
            >
                <img src={membro.foto} alt={`Foto de ${membro.nome}`} className={style.foto} />
            </div>
            
            <div className={style.info}>
                <h2 className={style.nome}>{membro.nome}</h2>
                <h3 className={style.tituloCargo}>{membro.titulo}</h3>
                <p className={style.descricao}>{membro.descricao}</p>
            </div>
        </article>
    );
}

export default function SobreNos() {
    const [offsetY, setOffsetY] = useState(0);
    const [imagemHero, setImagemHero] = useState("");

    useEffect(() => {
        // 1. Seleciona uma imagem aleatória do seu array de jogos assim que o componente monta
        if (jogosData && jogosData.length > 0) {
            const indexAleatorio = Math.floor(Math.random() * jogosData.length);
            setImagemHero(jogosData[indexAleatorio].hero);
        }

        // 2. Listener do Paralaxe
        const handleScroll = () => setOffsetY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className={style.container}>
            <Head>
                <title>Sobre Nós | Gameblog</title>
            </Head>

            {/* Fundo Hero Dinâmico vindo do seu complementaryData */}
            {imagemHero && (
                <div 
                    className={style.heroWrapper}
                    style={{ '--parallax-offset': `${offsetY * 0.6}px` }} 
                >
                    <img src={imagemHero} className={style.hero} alt="Fundo Destaque" />
                </div>
            )}

            <div className={style.conteudoPrincipal}>
                <header className={style.header}>
                    <h1 className={`${style.tituloMain} ${style.animacaoEntrada}`}>Conheça o gameblog Team</h1>
                </header>

                <section className={style.grid}>
                    {equipe.map((membro, index) => (
                        <MembroCard key={membro.id} membro={membro} index={index} />
                    ))}
                </section>
            </div>
        </main>
    );
}