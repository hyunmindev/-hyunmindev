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
  async rewrites() {
    return Promise.resolve([
      {
        destination:
          'https://qqddcdkmxnhleprxiatl.supabase.co/storage/v1/object/public/:path*',
        source: '/storage/:path*',
      },
    ]);
  },
  transpilePackages: ['@hyunmin-dev/ui'],
};

export default withBundleAnalyzer(nextConfig);
