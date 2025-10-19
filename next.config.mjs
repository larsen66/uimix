import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'static.cdn-luma.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.awwwards.com',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      resourceQuery: /raw/,
      type: 'asset/source',
    });
    return config;
  },
};

export default withMDX(config);
