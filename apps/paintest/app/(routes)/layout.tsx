import type { Metadata } from 'next';

import '@hyunmin-dev/ui/globals.css';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { type ReactNode } from 'react';

import '~/_styles/globals.css';

export const metadata: Metadata = {
  description: '나무 그림을 그려보세요. 당신의 심리를 알려줄게요. 🌳',
  title: 'paintest',
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html lang="ko">
      <body className={cn(GeistSans.className, 'm-auto max-w-screen-sm')}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
