import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
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
