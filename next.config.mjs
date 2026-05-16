/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Sem strip de trailing slash — deixa o Flask atrás do proxy decidir.
  skipTrailingSlashRedirect: true,

  async rewrites() {
    return [
      // AssinaturasPro (Flask + Postgres no Railway) — proxy mantendo o prefixo
      // pra que o app receba o path /assinatura/* e gere URLs internas corretas.
      {
        source: '/assinatura',
        destination: 'https://assinatura.luquisys.com.br/assinatura',
      },
      {
        source: '/assinatura/:path*',
        destination: 'https://assinatura.luquisys.com.br/assinatura/:path*',
      },
    ];
  },

};

export default nextConfig;
