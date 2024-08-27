import type { Metadata } from 'next';

import { GeistMono } from 'geist/font/mono';
import { type ReactNode } from 'react';

import '~/_styles/globals.css';

export const metadata: Metadata = {
  description: 'regexam',
  title: 'regexam',
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html className={GeistMono.variable} lang="en">
      <body>
        <header>regexam</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
