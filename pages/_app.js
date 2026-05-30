import '../src/style/global.css'
import { Google_Sans } from 'next/font/google'

const googleSans = Google_Sans({ 
  variable: '--fonte-principal'
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${googleSans.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}