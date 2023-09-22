import '../styles/globals.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { SessionProvider } from "next-auth/react"
/**
 * Para folhas de estilo global, como bootstrap ou nprogress, você deve importar 
 * o arquivo aqui dentro de pages/_app.js. 
 * 
 * import 'bootstrap/dist/css/bootstrap.css'
 */

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
