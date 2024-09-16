import type { Metadata } from 'next';

import '@hyunmin-dev/ui/globals.css';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { GeistMono } from 'geist/font/mono';
import { type ReactNode } from 'react';

import '~/_styles/globals.css';

export const metadata: Metadata = {
  description: 'paintest',
  title: 'paintest',
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html lang="ko">
      <body className={cn(GeistMono.className, 'h-screen w-screen')}>
        <main className="size-full p-4">{children}</main>
      </body>
    </html>
  );
}
