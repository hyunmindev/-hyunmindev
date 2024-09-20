import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { SKETCH_DESCRIPTION, TITLE } from '~/_constants/meta';

import { ShareButton } from './_components/ShareButton';
import { SketchResult } from './_components/SketchResult';
import { SketchToolbar } from './_components/SketchToolbar';

interface Properties {
  params: {
    sketchId: string;
  };
}

export function generateMetadata({ params }: Properties): Metadata {
  const { sketchId } = params;
  return {
    description: SKETCH_DESCRIPTION,
    openGraph: {
      images: [`/storage/sketches/${sketchId}`],
    },
    title: TITLE,
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
          className="object-contain"
          fill
          priority
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
      <Button variant="outline">
        <Link href="https://www.buymeacoffee.com/hyunmin.dev">
          ☕️ 커피 한 잔 사주기
        </Link>
      </Button>
    </>
  );
}
