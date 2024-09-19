import { cn } from '@hyunmin-dev/ui/libs/utils';

import { selectSketch } from '~/_services/supabase';

interface Properties {
  sketchId: string;
}

export async function SketchResult({ sketchId }: Readonly<Properties>) {
  const sketch = await selectSketch({ sketchId });
  return (
    <div
      className={cn(
        'whitespace-pre-wrap rounded-md border p-4',
        '[&>.alert]:text-sm [&>.alert]:text-muted-foreground',
        '[&>h2]:text-lg [&>h2]:font-bold',
        '[&>h1]:text-xl [&>h1]:font-bold',
      )}
      dangerouslySetInnerHTML={{ __html: sketch.result }}
    />
  );
}
