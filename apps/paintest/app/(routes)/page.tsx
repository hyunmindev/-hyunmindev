'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { useMutation } from '@tanstack/react-query';
import { Eraser, Pencil, Redo, Trash2, Undo } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from 'react-sketch-canvas';

import { type AnalyzeBody } from '~/_types/api';
import { metch } from '~/_utils/metch';

export default function Page() {
  const [strokeColor, setStrokeColor] = useState<string>('#8B4513');
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');
  const router = useRouter();

  const canvasReference = useRef<ReactSketchCanvasRef>(null);

  useEffect(() => {
    canvasReference.current?.eraseMode(mode === 'erase');
  }, [mode]);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (body: AnalyzeBody) =>
      metch<string>({
        body,
        method: 'POST',
        path: '/api/v1/analyze',
      }),
  });

  return (
    <div className="flex size-full flex-col gap-4 p-6">
      <div className="flex flex-wrap gap-2">
        <div className="size-10 overflow-hidden rounded-full border">
          <input
            className="size-[200%] -translate-x-1/4 -translate-y-1/4 appearance-none"
            onChange={(event) => {
              setStrokeColor(event.target.value);
              setMode('draw');
            }}
            type="color"
            value={strokeColor}
          />
        </div>
        <Button
          className={cn('rounded-full', { 'bg-muted': mode === 'draw' })}
          onClick={() => {
            setMode('draw');
          }}
          size="icon"
          variant="outline"
        >
          <Pencil
            className={cn('stroke-border', {
              'stroke-muted-foreground': mode === 'draw',
            })}
          />
        </Button>
        <Button
          className={cn('rounded-full', { 'bg-muted': mode === 'erase' })}
          onClick={() => {
            setMode('erase');
          }}
          size="icon"
          variant="outline"
        >
          <Eraser
            className={cn('stroke-border', {
              'stroke-muted-foreground': mode === 'erase',
            })}
          />
        </Button>
        <div className="grow" />
        <Button
          className="rounded-full border-muted-foreground"
          onClick={() => {
            canvasReference.current?.undo();
          }}
          size="icon"
          variant="outline"
        >
          <Undo className="stroke-muted-foreground" />
        </Button>
        <Button
          className="rounded-full border-muted-foreground"
          onClick={() => {
            canvasReference.current?.redo();
          }}
          size="icon"
          variant="outline"
        >
          <Redo className="stroke-muted-foreground" />
        </Button>
        <Button
          className="rounded-full border-destructive"
          onClick={() => {
            canvasReference.current?.resetCanvas();
          }}
          size="icon"
          variant="outline"
        >
          <Trash2 className="stroke-destructive" />
        </Button>
      </div>
      <div className="h-96 w-full rounded-md border">
        <ReactSketchCanvas
          canvasColor="#FFFFFF"
          eraserWidth={12}
          ref={canvasReference}
          strokeColor={strokeColor}
          style={{ border: 'unset' }}
          withTimestamp
        />
      </div>
      <Button
        className="w-full"
        disabled={isPending}
        onClick={async () => {
          const canvas = canvasReference.current;
          const sketch = await canvas?.exportImage('jpeg');
          const sketchingTime = await canvas?.getSketchingTime();
          const paths = await canvas?.exportPaths();
          const strokeCount = paths?.length;
          if (!sketch || !sketchingTime || !strokeCount) {
            return;
          }
          const sketchId = await mutateAsync({
            sketch,
            sketchingTime,
            strokeCount,
          });
          router.push(`/sketches/${sketchId}`);
        }}
      >
        {isPending ? '분석 중...' : '분석하기'}
      </Button>
    </div>
  );
}
