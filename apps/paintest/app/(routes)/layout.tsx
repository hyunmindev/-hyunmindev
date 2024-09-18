import type { Metadata } from 'next';

import '@hyunmin-dev/ui/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Nanum_Myeongjo as NanumMyeongjo } from 'next/font/google';
import { type ReactNode } from 'react';

import { ReactQueryProvider } from '~/(routes)/_components';
import '~/_styles/globals.css';

const nanumMyeongjo = NanumMyeongjo({
  display: 'block',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  description: '나무 그림을 그려보세요. 당신의 심리를 알려줄게요. 🌳',
  title: 'paintest',
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html className={nanumMyeongjo.className} lang="ko">
      <body className="m-auto max-w-screen-sm">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
