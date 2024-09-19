'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { useParams } from 'next/navigation';

export function ShareButton() {
  const { sketchId } = useParams<{ sketchId: string }>();

  return (
    <Button
      onClick={() => {
        void navigator.share({
          text: '그림을 통해 분석된 심리 테스트 결과를 확인해보세요!',
          title: 'AI 그림 심리 테스트',
          url: `${window.location.origin}/sketches/${sketchId}`,
        });
      }}
      variant="outline"
    >
      공유하기
    </Button>
  );
}
