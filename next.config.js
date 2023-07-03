/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'bank.opti-demo.xyz',
          pathname: '/globalassets/**',
        },
        {
          protocol: 'https',
          hostname: 'images2.welcomesoftware.com',
        },
        {
            protocol: 'https',
            hostname: 'source.unsplash.com',
        }
    ],
  },
}

module.exports = nextConfig
