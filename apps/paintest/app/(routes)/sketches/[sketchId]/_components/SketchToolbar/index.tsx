'use client';

import { Save, Share } from '@hyunmin-dev/ui/components/icons';
import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { useParams } from 'next/navigation';

export function SketchToolbar() {
  const { sketchId } = useParams<{ sketchId: string }>();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => {
          void navigator.share({
            text: '이 그림을 AI 심리 전문가가 분석한 결과를 확인해보세요!',
            title: 'AI 그림 심리 테스트',
            url: `${window.location.origin}/sketches/${sketchId}`,
          });
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
