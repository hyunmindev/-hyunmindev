import type { Metadata } from 'next';

import { Toaster } from '@hyunmin-dev/ui/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { type ReactNode } from 'react';

import { TRPCReactProvider } from '~/_configs/trpc/react';
import { DESCRIPTION, TITLE } from '~/_constants/meta';
import { gaegu } from '~/_styles/fonts';
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
    <html className={gaegu.variable} lang="ko">
      <body className="m-auto flex min-h-screen max-w-screen-sm flex-col text-xl">
        <main className="flex size-full grow flex-col gap-4 p-6">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </main>
        <footer className="m-1 text-center text-sm">
          ⓒ 2024. hyunmin All Rights Reserved.
        </footer>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
