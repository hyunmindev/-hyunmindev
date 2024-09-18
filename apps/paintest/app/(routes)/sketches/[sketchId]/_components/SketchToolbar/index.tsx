'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export function SketchToolbar() {
  const parameters = useParams<{ sketchId: string }>();
  const sketchId = Number(parameters.sketchId);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        className="flex rounded-full border-muted-foreground"
        onClick={() => {
          void navigator.clipboard.writeText(
            `${window.location.origin}/sketches/${sketchId.toString()}`,
          );
          // eslint-disable-next-line no-alert -- 임시
          alert('Copied to clipboard!');
        }}
        size="icon"
        variant="outline"
      >
        <Share2 className="size-5 stroke-muted-foreground" />
      </Button>
    </div>
  );
}
