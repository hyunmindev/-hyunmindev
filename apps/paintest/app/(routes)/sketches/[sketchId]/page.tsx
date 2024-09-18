import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createServerClient } from '~/_configs/supabase';
import { SKETCH_IMAGE_BASE_URL } from '~/_constants';

import { ResultView } from './_components/ResultView';

export async function generateMetadata({
  params,
}: {
  params: {
    sketchId: string;
  };
}): Promise<Metadata> {
  const sketchId = Number(params.sketchId);
  const supabase = createServerClient();
  const { data: records } = await supabase
    .from('sketches')
    .select()
    .eq('id', sketchId);
  const sketch = records?.[0];
  if (!sketch) {
    notFound();
  }
  return {
    openGraph: {
      images: [`${SKETCH_IMAGE_BASE_URL}/${sketch.id.toString()}.jpeg`],
    },
    title: '나무 그리기',
  };
}

export default function Result() {
  return <ResultView />;
}
