import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack(config) {
    // Add loader for .md and .mdx files when imported as modules
    config.module.rules.push({
      test: /\.mdx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@mdx-js/loader',
        },
      ],
    });
    return config;
  },
};

export default withMDX(nextConfig);

