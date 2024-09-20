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
        'simple-border whitespace-pre-wrap p-4',
        '[&>.alert]:text-sm [&>.alert]:text-muted-foreground',
      )}
      dangerouslySetInnerHTML={{ __html: sketch.result }}
    />
  );
}
