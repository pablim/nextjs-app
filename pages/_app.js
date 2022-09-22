import '../styles/globals.css'

/**
 * Para folhas de estilo global, como bootstrap ou nprogress, você deve importar 
 * o arquivo aqui dentro de pages/_app.js. 
 * 
 * import 'bootstrap/dist/css/bootstrap.css'
 */

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
