import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Use BASE_PATH environment variable for deployment under subpath
// Leave empty for local development or root domain deployment
const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  ...(basePath && { basePath }),
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withNextIntl(withMDX(nextConfig));
