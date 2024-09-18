'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { Save, Share } from 'lucide-react';
import { useParams } from 'next/navigation';

export function SketchToolbar() {
  const parameters = useParams<{ sketchId: string }>();
  const sketchId = Number(parameters.sketchId);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => {
          void navigator.share({
            text: '그림을 통해 분석된 심리 테스트 결과를 확인해보세요!',
            title: 'AI 그림 심리 테스트',
            url: `${window.location.origin}/sketches/${sketchId.toString()}`,
          });
        }}
        size="icon"
        variant="outline"
      >
        <Share className="stroke-muted-foreground" />
      </Button>
      <Button size="icon" variant="outline">
        <a
          download="나무.jpeg"
          href={`/storage/sketches/${sketchId.toString()}.jpeg`}
        >
          <Save className="stroke-muted-foreground" />
        </a>
      </Button>
    </div>
  );
}
