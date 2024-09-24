import { cn } from '@hyunmin-dev/ui/libs/utils';

import { api } from '~/_configs/trpc/server';

interface Properties {
  sketchId: string;
}

export async function SketchResult({ sketchId }: Readonly<Properties>) {
  const sketch = await api.sketches.detail({ sketchId });

  return (
    <div
      className={cn(
        'simple-border whitespace-pre-wrap p-4',
        '[&>.alert]:text-sm [&>.alert]:text-muted-foreground',
      )}
      dangerouslySetInnerHTML={{ __html: sketch.result }}
    />
  );
}
