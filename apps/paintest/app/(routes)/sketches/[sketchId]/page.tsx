import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { selectSketch } from '~/_services/supabase';

import { ShareButton } from './_components/ShareButton';
import { SketchResult } from './_components/SketchResult';
import { SketchToolbar } from './_components/SketchToolbar';

interface Properties {
  params: {
    sketchId: string;
  };
}

export async function generateMetadata({
  params,
}: Properties): Promise<Metadata> {
  const { sketchId } = params;
  const sketch = await selectSketch({ sketchId });
  return {
    description: '나무 그림으로 AI가 분석한 심리 테스트 결과입니다. 🌳',
    openGraph: {
      images: [`/storage/sketches/${sketch.id}`],
    },
    title: 'AI 그림 심리 테스트',
  };
}

export default function Sketch({ params }: Readonly<Properties>) {
  const { sketchId } = params;
  return (
    <>
      <h1>심리 테스트 결과! 🎄</h1>
      <SketchToolbar />
      <div className="simple-border relative h-96 w-full">
        <Image
          alt="sketch"
          className="object-cover"
          fill
          src={`/storage/sketches/${sketchId}`}
        />
      </div>
      <Suspense>
        <SketchResult sketchId={sketchId} />
      </Suspense>
      <div className="flex gap-2">
        <Link className="grow" href="/draw">
          <Button className="w-full">테스트하기</Button>
        </Link>
        <ShareButton />
      </div>
    </>
  );
}
