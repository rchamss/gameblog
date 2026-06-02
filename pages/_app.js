import '../src/style/global.css'
import { Google_Sans } from 'next/font/google'
import { useRouter } from 'next/router'
import Cabecalho from '../src/components/cabecalho'

const PG_SEM_CABECALHO = ['/login', '/404']

const googleSans = Google_Sans({ 
  variable: '--fonte-principal'
})


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const naoMostrarCabecalho = !PG_SEM_CABECALHO.includes(router.pathname)

  return (
    <div className={`${googleSans.variable}`}>
      {naoMostrarCabecalho && <Cabecalho/>}
      <Component {...pageProps} />
    </div>
  )
}