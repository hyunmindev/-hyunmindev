'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button
        asChild
        size="lg"
      >
        <Link href="/chat">채팅방 입장</Link>
      </Button>
    </div>
  );
}
