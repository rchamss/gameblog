import '../src/style/global.css'
import { Google_Sans_Flex } from 'next/font/google'
import { useRouter } from 'next/router'
import Cabecalho from '../src/components/header/cabecalho'
import CabecalhoMobile from '../src/components/header/cabecalhoMobile'
import { useContext, createContext, useState, useEffect } from 'react'
import MensagemSistema from '../src/components/MensagemSistema'
import Lenis from 'lenis'

const PG_SEM_CABECALHO = ['/login', '/404']

const googleSans = Google_Sans_Flex({
  variable: '--fonte-principal'
})

export const MensagemContext = createContext()

export default function App({ Component, pageProps}) {
  const [mensagem, setMensagem] = useState()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const mostrarCabecalho = !PG_SEM_CABECALHO.includes(router.pathname)

  // 2. ATIVAR O SMOOTH SCROLL PROFISSIONAL
  useEffect(() => {
    // Inicializa o Lenis
    const lenis = new Lenis({
      duration: 1.2,      // Duração da animação do scroll (em segundos)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavização
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,  // Suaviza o scroll do mouse
    })

    // Conecta o Lenis ao ciclo de renderização (Frame Animation) do navegador
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Limpa a instância ao desmontar o app
    return () => {
      lenis.destroy()
    }
  }, [])

  function mostrarMensagem(codigo, texto){
    console.log('mostrarMensagem:', codigo, texto, Date.now())
    setMensagem({ status: codigo, mensagem: texto, ID: Date.now() })
  }

  useEffect(() => {
    if (!mensagem) return
    const timer = setTimeout(() => setMensagem(null), 4000)
    return () => clearTimeout(timer)
  }, [mensagem])

  useEffect(() => {
    const verificarTamanhoTela = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    verificarTamanhoTela()
    window.addEventListener('resize', verificarTamanhoTela)
    return () => window.removeEventListener('resize', verificarTamanhoTela)
  }, [])

    return (
      <MensagemContext value={ { mostrarMensagem } }>
        <div className={googleSans.variable}>
          {mostrarCabecalho && (isMobile ? <CabecalhoMobile /> : <Cabecalho />)}
          {mensagem && <MensagemSistema key={mensagem.ID} status={mensagem.status} mensagem={mensagem.mensagem} onClose={() => setMensagem(null)} />}
          <Component {...pageProps} />
        </div>
      </MensagemContext>
  )
}