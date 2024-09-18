import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SketchToolbar } from '~/(routes)/sketches/[sketchId]/_components/SketchToolbar';
import { SKETCH_IMAGE_BASE_URL } from '~/_constants';
import { readSketch } from '~/_services';

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
      images: [`${SKETCH_IMAGE_BASE_URL}/${sketch.id.toString()}.jpeg`],
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
      <div className="relative h-96 w-full rounded-md border">
        <Image
          alt="sketch"
          fill
          objectFit="contain"
          src={`${SKETCH_IMAGE_BASE_URL}/${sketch.id.toString()}.jpeg`}
        />
      </div>
      <div
        className="whitespace-pre-wrap rounded-md border p-4"
        dangerouslySetInnerHTML={{ __html: sketch.result }}
      />
      <Link href="/">
        <Button className="w-full">다시 그리기</Button>
      </Link>
    </div>
  );
}
