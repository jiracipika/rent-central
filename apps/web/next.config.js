/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@rent-central/core', '@rent-central/ui'],
  turbopack: {
    root: '../../',
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
