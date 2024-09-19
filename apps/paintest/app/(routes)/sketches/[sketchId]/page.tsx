import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SketchResult } from '~/(routes)/sketches/[sketchId]/_components/SketchResult';
import { selectSketch } from '~/_services/supabase';

import { ShareButton } from './_components/ShareButton';
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
    <div className="flex size-full flex-col gap-4 p-6">
      <h1 className="text-xl font-bold">나무로 본 심리 테스트 결과! 🎄</h1>
      <SketchToolbar />
      <div className="relative h-96 w-full overflow-hidden rounded-md border">
        <Image
          alt="sketch"
          className="object-contain"
          fill
          src={`/storage/sketches/${sketchId}`}
        />
      </div>
      <SketchResult sketchId={sketchId} />
      <div className="flex gap-2">
        <Link className="grow" href="/">
          <Button className="w-full">다시 그리기</Button>
        </Link>
        <ShareButton />
      </div>
    </div>
  );
}
