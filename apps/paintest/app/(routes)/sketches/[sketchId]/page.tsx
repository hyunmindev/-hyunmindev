import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { BASE_URL, SKETCH_DESCRIPTION, TITLE } from '~/_constants/meta';

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
    metadataBase: new URL(BASE_URL),
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
        <ShareButton />
        <Button variant="outline">
          <Link href="https://www.buymeacoffee.com/hyunmin.dev">
            ☕️ 개발자에게 커피 한 잔 사주기
          </Link>
        </Button>
        <Link
          className="grow"
          href="/draw"
        >
          <Button className="w-full">테스트하기</Button>
        </Link>
      </Suspense>
    </>
  );
}

export const dynamic = 'force-static';
