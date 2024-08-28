import type { Metadata } from 'next';

import '@hyunmin-dev/ui/globals.css';
import { GeistMono } from 'geist/font/mono';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'regexam',
  title: 'regexam',
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <header>regexam</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
