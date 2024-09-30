'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <Button
        asChild
        className="h-14"
        type="submit"
        variant="outline"
      >
        <Link href="/chat">채팅방 입장</Link>
      </Button>
    </div>
  );
}
