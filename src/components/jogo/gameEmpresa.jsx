import React, { useContext } from 'react';
import Link from 'next/link';
import { JogoContext } from '../../../pages/jogo/[id]';
import style from '../../style/components/jogo/gameEmpresa.module.css';

export default function GameEmpresa() {
    // Acessa os dados do jogo fornecidos pelo Provider no [id].jsx
    const { jogoPublic } = useContext(JogoContext);

    // Proteção: Se a API não retornar o nome da empresa, o botão não é renderizado
    if (!jogoPublic || !jogoPublic.empresa_nome) return null;

    return (
        <div className={style.container}>
            <Link
                href={`/empresa/${encodeURIComponent(jogoPublic.empresa_nome)}`}
                className={style.botaoEmpresa}
            >
                Mais de {jogoPublic.empresa_nome}
            </Link>
        </div>
    );
}