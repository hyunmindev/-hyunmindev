import type { Metadata } from 'next';

import '@hyunmin-dev/ui/globals.css';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { GeistSans } from 'geist/font/sans';
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
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
