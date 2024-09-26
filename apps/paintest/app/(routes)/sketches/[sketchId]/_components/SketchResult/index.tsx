import { cn } from '@hyunmin-dev/ui/libs/utils';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { api } from '~/_configs/trpc/server';

interface Properties {
  sketchId: string;
}

export async function SketchResult({ sketchId }: Readonly<Properties>) {
  const { result } = await api.sketches.detail({ sketchId });

  return (
    <Markdown
      className={cn(
        'simple-border whitespace-pre-wrap p-4',
        '[&>.alert]:text-sm [&>.alert]:text-muted-foreground',
      )}
      rehypePlugins={[rehypeRaw]}
    >
      {result}
    </Markdown>
  );
}
