/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }; // just in case
    return config;
  },
};

module.exports = nextConfig;