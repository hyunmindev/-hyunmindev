'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import type { Tables } from '~/_types/database.types';

import { SKETCH_IMAGE_BASE_URL } from '~/_constants';
import { metch } from '~/_utils/metch';

export function ResultView() {
  const parameters = useParams<{ sketchId: string }>();
  const sketchId = Number(parameters.sketchId);

  const { data: sketch } = useSuspenseQuery({
    gcTime: Number.POSITIVE_INFINITY,
    queryFn: () =>
      metch<Tables<'sketches'>>({
        path: `/api/v1/sketches/${sketchId.toString()}`,
      }),
    queryKey: ['sketches', sketchId],
    staleTime: Number.POSITIVE_INFINITY,
  });

  return (
    <div className="flex size-full flex-col gap-4 p-6">
      <div className="flex flex-wrap gap-2">
        <Button
          className="rounded-full border-muted-foreground"
          onClick={() => {
            void navigator.clipboard.writeText(
              `${window.location.origin}/sketches/${sketchId.toString()}`,
            );
            // eslint-disable-next-line no-alert -- 임시
            alert('Copied to clipboard!');
          }}
          size="icon"
          variant="outline"
        >
          <Share2 className="stroke-muted-foreground" />
        </Button>
      </div>
      <div className="relative h-96 w-full rounded-md border">
        <Image
          alt="sketch"
          fill
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
