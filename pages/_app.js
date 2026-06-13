import '../src/style/global.css'
import { Google_Sans_Flex } from 'next/font/google'
import { useRouter } from 'next/router'
import Cabecalho from '../src/components/header/cabecalho'
import SystemMensagem from '../src/components/systemMensagem'
import { useContext, createContext, useState } from 'react'

const PG_SEM_CABECALHO = ['/login', '/404']

const googleSans = Google_Sans_Flex({ 
  variable: '--fonte-principal'
})

export const MensagemContext = createContext(null)

export default function App({ Component, pageProps}) {
  const router = useRouter()
  const naoMostrarCabecalho = !PG_SEM_CABECALHO.includes(router.pathname)
  const [chamado, setChamado] = useState()
  
    return (
      <MensagemContext value={{chamado, setChamado}}>
        <div className={googleSans.variable}>
          {naoMostrarCabecalho && <Cabecalho/>}
          {chamado ? <SystemMensagem tipo={chamado.tipo} mensagem={chamado.texto}/> : null}
          <Component {...pageProps} />
        </div>
      </MensagemContext>
  )
}