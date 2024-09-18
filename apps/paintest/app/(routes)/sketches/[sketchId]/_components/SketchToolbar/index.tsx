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
          void navigator.share({
            text: '그림을 통해 분석된 심리 테스트 결과를 확인해보세요!',
            title: 'AI 그림 심리 테스트',
            url: `${window.location.origin}/sketches/${sketchId.toString()}`,
          });
        }}
        size="icon"
        variant="outline"
      >
        <Share2 className="size-5 stroke-muted-foreground" />
      </Button>
    </div>
  );
}
