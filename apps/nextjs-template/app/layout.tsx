import type { Metadata } from 'next';

import '@hyunmin-dev/ui/globals.css';
import { GeistSans } from 'geist/font/sans';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'description',
  title: 'title',
};

interface Properties {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Properties>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <header>template</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
