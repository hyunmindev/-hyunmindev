'use client';

import { Save, Share } from '@hyunmin-dev/ui/components/icons';
import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { useParams } from 'next/navigation';

import { shareSketch } from '~/_utils';

export function SketchToolbar() {
  const { sketchId } = useParams<{ sketchId: string }>();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => {
          void shareSketch({ sketchId });
        }}
        size="icon"
        variant="outline"
      >
        <Share className="stroke-muted-foreground" />
      </Button>
      <Button size="icon" variant="outline">
        <a download="나무.png" href={`/storage/sketches/${sketchId}`}>
          <Save className="stroke-muted-foreground" />
        </a>
      </Button>
    </div>
  );
}
