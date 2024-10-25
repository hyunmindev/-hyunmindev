import bundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';

import { env } from '~/_configs/env';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@hyunmin-dev/ui'],
};

export default withBundleAnalyzer(nextConfig);
