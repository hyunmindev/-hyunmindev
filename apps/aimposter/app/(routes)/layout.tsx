import type { Metadata } from 'next';

import { Toaster } from '@hyunmin-dev/ui/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { type ReactNode } from 'react';

import { TRPCReactProvider } from '~/_configs/trpc/react';
import { DESCRIPTION, TITLE } from '~/_constants/meta';
import { notoSansMono } from '~/_styles/fonts';
import '~/_styles/globals.css';

export const metadata: Metadata = {
  description: DESCRIPTION,
  title: TITLE,
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html
      className={notoSansMono.variable}
      lang="ko"
    >
      <body>
        <main>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
