'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { useParams } from 'next/navigation';

import { shareSketch } from '~/_utils';

export function ShareButton() {
  const { sketchId } = useParams<{ sketchId: string }>();

  return (
    <Button
      onClick={() => {
        void shareSketch({ sketchId });
      }}
      variant="outline"
    >
      공유하기
    </Button>
  );
}
