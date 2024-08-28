import type { Metadata } from 'next';

import { Separator } from '@hyunmin-dev/ui/components/ui/separator';
import '@hyunmin-dev/ui/globals.css';
import { cn } from '@hyunmin-dev/ui/libs/utils';
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
    <html lang="en">
      <body className={cn(GeistMono.className, 'h-screen w-screen')}>
        <header className="flex p-4">
          <h1 className="text-4xl">regexam</h1>
        </header>
        <Separator />
        <main className="size-full p-4">{children}</main>
      </body>
    </html>
  );
}
