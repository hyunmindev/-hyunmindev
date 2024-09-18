import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { readSketch } from '~/_services';

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
  const sketchId = Number(params.sketchId);
  const sketch = await readSketch(sketchId);
  return {
    description: '나무 그림으로 AI가 분석한 심리 테스트 결과입니다. 🌳',
    openGraph: {
      images: [`/storage/sketches/${sketch.id.toString()}.jpeg`],
    },
    title: 'AI 그림 심리 테스트',
  };
}

export default async function Sketch({ params }: Readonly<Properties>) {
  const sketchId = Number(params.sketchId);
  const sketch = await readSketch(sketchId);
  return (
    <div className="flex size-full flex-col gap-4 p-6">
      <h1 className="text-xl font-bold">나무로 본 심리 테스트 결과! 🎄</h1>
      <SketchToolbar />
      <div className="relative h-96 w-full overflow-hidden rounded-md border">
        <Image
          alt="sketch"
          className="object-contain"
          fill
          src={`/storage/sketches/${sketch.id.toString()}.jpeg`}
        />
      </div>
      <div
        className={cn(
          'whitespace-pre-wrap rounded-md border p-4',
          '[&>.alert]:text-sm [&>.alert]:text-muted-foreground',
          '[&>h2]:text-lg [&>h2]:font-bold',
          '[&>h1]:text-xl [&>h1]:font-bold',
        )}
        dangerouslySetInnerHTML={{ __html: sketch.result }}
      />
      <div className="flex gap-2">
        <Link className="grow" href="/">
          <Button className="w-full">다시 그리기</Button>
        </Link>
        <ShareButton />
      </div>
    </div>
  );
}
