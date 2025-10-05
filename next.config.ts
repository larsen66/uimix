import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.21st.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.awwwards.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.cdn-luma.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
