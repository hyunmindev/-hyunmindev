import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';
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
    <html className={GeistSans.variable} lang="en">
      <body>{children}</body>
    </html>
  );
}
