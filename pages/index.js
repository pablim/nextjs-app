import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script';

export default function Home() {
  return (
    <div >
        {/* 
            Podemos mudar as informações de metadata pelo componente Head, ele 
            permite que possamos modificar o head da página.
        */}
        <Head>
            <title>NextJS APP</title>
            <link rel="icon" href="/favicon.ico" />

            {/* 
            Adicionando Javascript de terceiros, usando o Script Component

            Além de metadados, scripts que precisam ser carregados e executados o 
            mais breve possível são frequentemente adicionados no head da pagina. 
            Usando <script>.

            Embora essa isso funcione, incluir scripts dessa maneira, não deixa 
            uma ideia clara de quando ele seria carregado em relação a outros 
            códigos já inseridos na mesma página. Se um script em específico 
            bloqueia o carregamento da página isso pode afetar significantemente 
            o desempenho.

            */}
            {/* <script src="https://connect.facebook.net/en_US/sdk.js" /> */}
        </Head>

        {/* 
            Script é uma extensão otimizada de <script> 

            strategy - controls when the third-party script should load. A value of 
            lazyOnload tells Next.js to load this particular script lazily during 
            browser idle time
            onLoad - is used to run any JavaScript code immediately after the 
            script has finished loading. In this example, we log a message to the 
            console that mentions that the script has loaded correctly
        */}
        <Script
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy="lazyOnload"
            onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
            }
        />

        <div style={{
                display: 'flex', 
                width: '100%', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column'
            }}
        >

            {/*  
                Imagens podem ser carregadas de dentro da pasta public. 

                Next suporta otimização de imagens por padrão. Isso permite 
                redimensionar e otimizar e servir em formatos modernos como WebP. Isso 
                evita entregar grandes imagens a dispositivos com uma viewport pequena.

                Isso funciona para qualquer lugar que a imagem esteja mesmo quando ela 
                estiver hospedada externamente.

                A otimização é feita sob demanda, quando o usuário requisita, ao 
                invés e não no build. Diferente de outras soluções. O tempo de build
                não aumenta sendo 10 imagens ou 10 milhões.

                Imagens são carregadas sob demanda por padrão, ou seja, o tempo de 
                carregamento da página não é afetado por imagens fora da viewport. 
                Elas são carregadas a medida que a página é rolada.

                Imagens são sempre renderizadas de forma a evitar Cumulative Layout 
                Shift https://web.dev/cls/?gclid=CjwKCAjw9suYBhBIEiwA7iMhNFRUBqto5s2lT7jCZNSPFADM5wHsiYb7w07kZ2fZaHfKVTKtaCt4ohoCWNUQAvD_BwE

                This folder (public) is also useful for robots.txt, favicon.ico, 
                Google Site Verification, and any other static files (including 
                .html)!

                Note: Be sure to not have a static file with the same name as a file 
                in the pages/ directory, as this will result in an error.

                Priority attribute
                When true, the image will be considered high priority and preload. 
                Lazy loading is automatically disabled for images using priority. You 
                should use the priority property on any image detected as the Largest 
                Contentful Paint (LCP) element. It may be appropriate to have multiple 
                priority images, as different images may be the LCP element for 
                different viewport sizes.Should only be used when the image is 
                visible above the fold. Defaults to false.

            */}
            <Image
                src="/images/profile.jpg" // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="Your Name"
            />

            {/* 
                Podemos usar diretamente a tag <img> do html, entretanto isso quer 
                dizer que teremos que gerenciar manualmente: 

                - a garantia da imagem ser responsiva em diferentes tamanhos de tela
                - otimização da imagem
                - somente carregar a image quando entrar na viewport

                */}
            {/* <img src="/images/profile.jpg" alt="Your Name" width="100px" /> */}


            {/*  
                O componente Link permite um client-side navigation entre paginas da 
                mesma aplicação. Isso significa a mudança de página acontece usando 
                javascript que é mais rápido do que a navegação padrão do browser. 
                Ou seja, o browser não recarrega a página inteira e sim só o que precisa;

                Se você setar uma cor de fundo para <html> no navegador e usar 
                <a href="…"> ao invés de <Link href="…"> verá que a cor irá mudar

                Além de em um build de produção, sempre que componentes Link aparecem 
                no browser, o next automaticamente precarrega o código da página 
                linkada em background. Permitindo uma renderização instantânea quando o 
                link for acessado

                Se precisar de um link externo a aplicação use a tag <a> ao invés de 
                <Link>
                
                Se precisar adicionar atributos como className, adicione na tag <a> e 
                não na tag <Link>. Por exemplo:
                <Link href="/">
                <a className="foo" target="_blank" rel="noopener noreferrer">
                    Hello World
                </a>
                </Link>
            */}
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
            <Link href="/checkout">Checkout</Link>
        </div>

        {/* <script>
          function handleCredentialResponse(response) {
            console.log("Encoded JWT ID token: " + response.credential)
          }
          window.onload = function () {
            google.accounts.id.initialize({
              client_id: "YOUR_GOOGLE_CLIENT_ID",
              callback: handleCredentialResponse
            })
            
            google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          {theme: "outline", size: "large" }  // customization attributes
          )

          google.accounts.id.prompt(); // also display the One Tap dialog
          }

        </script> */}

      


    </div>
  )
}
