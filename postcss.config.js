/**
 * Customizing PostCSS Config
 * Out of the box, with no configuration, Next.js compiles CSS using PostCSS.
 * To customize PostCSS config, you can create a top-level file called 
 * postcss.config.js. This is useful if you're using libraries like Tailwind 
 * CSS.
 * 
 * Here are the steps to add Tailwind CSS. First, install the packages:
 * 
 * npm install -D tailwindcss autoprefixer postcss
 * 
 * Then, create a postcss.config.js
 */

module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
};

/**
 * We also recommend configuring content sources by specifying the content 
 * option on tailwind.config.js. 
 * 
 * Arquivo já criado e está configurado.
 * 
 */
 
  