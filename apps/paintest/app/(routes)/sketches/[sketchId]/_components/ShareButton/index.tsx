'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { useParams } from 'next/navigation';

import { SHARE_TEXT, SHARE_TITLE } from '~/_constants/meta';

export function ShareButton() {
  const { sketchId } = useParams<{ sketchId: string }>();

  return (
    <Button
      onClick={() => {
        void navigator.share({
          text: SHARE_TEXT,
          title: SHARE_TITLE,
          url: `${window.location.origin}/sketches/${sketchId}`,
        });
      }}
      variant="outline"
    >
      공유하기
    </Button>
  );
}
