/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    port: "3001",
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
