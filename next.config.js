/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Permet les images depuis le dossier public/assets
  images: {
    dynamic: true,
  },
};

module.exports = nextConfig;
