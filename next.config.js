/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

  transpilePackages: ["@pablovaz/jsprojlib"], // transpila sua lib
  webpack: (config) => {
    config.resolve.symlinks = true; // necessário se você usar npm link
    return config;
  },

  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
