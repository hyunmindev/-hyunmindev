import type { Metadata } from 'next';

import '@hyunmin-dev/ui/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Gaegu } from 'next/font/google';
import { type ReactNode } from 'react';

import '~/_styles/globals.css';

import { ReactQueryProvider } from './_components/ReactQueryProvider';

const gaegu = Gaegu({
  display: 'block',
  subsets: ['latin'],
  weight: '300',
});

export const metadata: Metadata = {
  description: '나무 그림을 그려보세요. 당신의 심리를 알려줄게요. 🌳',
  title: 'AI 그림 심리 테스트',
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html className={gaegu.className} lang="ko">
      <body className="m-auto flex min-h-screen max-w-screen-sm flex-col bg-stone-200 text-xl text-stone-800">
        <ReactQueryProvider>
          <main className="flex size-full grow flex-col gap-4 p-6">
            {children}
          </main>
        </ReactQueryProvider>
        <footer className="m-1 text-center text-sm">
          ⓒ 2024. hyunmin All Rights Reserved.
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
