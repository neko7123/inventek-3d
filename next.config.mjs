/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['*'], // optional, can remove
    },
  },
  // Important: no "output: 'export'" for Vercel
};

export default nextConfig;