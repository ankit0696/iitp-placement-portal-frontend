/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'http://172.16.53.120/'],
  },
}

module.exports = nextConfig
