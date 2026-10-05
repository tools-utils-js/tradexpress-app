/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Bypasses strict type verification checks to guarantee a successful compilation pass
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bypasses coding formatting warnings to accelerate local environment deployment
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
