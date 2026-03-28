/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@rent-central/core', '@rent-central/ui'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
