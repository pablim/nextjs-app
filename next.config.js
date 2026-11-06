/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //reactStrictMode: false, // false para testar mercado pago, depois voltar para true
  swcMinify: true,

  async headers() {
    return [
      {
        source: '/register',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          }
        ],
      },
    ]
  },

  transpilePackages: ["@pablovaz/reactjs-components-lib"], // transpila sua lib
  webpack: (config) => {
    config.resolve.symlinks = true; // necessário se você usar npm link
    return config;
  },

  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
