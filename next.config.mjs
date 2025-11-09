/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Enables static site generation (replaces `next export`)
  images: {
    unoptimized: true, // ✅ Important for Firebase Hosting (no dynamic image optimization)
  },
};

export default nextConfig;