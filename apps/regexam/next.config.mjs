// @ts-check

import bundleAnalyzer from '@next/bundle-analyzer';
import createJiti from 'jiti';
import { fileURLToPath } from 'node:url';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./app/env');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  transpilePackages: ['@hyunmin-dev/ui'],
});

export default nextConfig;
