// @ts-check

import bundleAnalyzer from '@next/bundle-analyzer';
import createJiti from 'jiti';
import { fileURLToPath } from 'node:url';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./app/_configs/env');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        hostname: 'qqddcdkmxnhleprxiatl.supabase.co',
        protocol: 'https',
      },
    ],
  },
  transpilePackages: ['@hyunmin-dev/ui'],
});

export default nextConfig;
