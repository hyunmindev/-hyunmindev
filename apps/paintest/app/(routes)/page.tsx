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
  const [error, setError] = useState<string>();
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
      <h1 className="text-xl font-bold">나무를 그려주세요! 🎄</h1>
      <div className="flex flex-wrap gap-2">
        <div className="size-10 overflow-hidden rounded-md border">
          <input
            className="size-[200%] -translate-x-1/4 -translate-y-1/4 appearance-none"
            onChange={(event) => {
              setError(undefined);
              setStrokeColor(event.target.value);
              setMode('draw');
            }}
            type="color"
            value={strokeColor}
          />
        </div>
        <Button
          className={cn({ 'bg-muted': mode === 'draw' })}
          onClick={() => {
            setError(undefined);
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
          className={cn({ 'bg-muted': mode === 'erase' })}
          onClick={() => {
            setError(undefined);
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
          onClick={() => {
            setError(undefined);
            canvasReference.current?.undo();
          }}
          size="icon"
          variant="outline"
        >
          <Undo className="stroke-muted-foreground" />
        </Button>
        <Button
          onClick={() => {
            setError(undefined);
            canvasReference.current?.redo();
          }}
          size="icon"
          variant="outline"
        >
          <Redo className="stroke-muted-foreground" />
        </Button>
        <Button
          className="border-destructive"
          onClick={() => {
            setError(undefined);
            canvasReference.current?.resetCanvas();
          }}
          size="icon"
          variant="outline"
        >
          <Trash2 className="stroke-destructive" />
        </Button>
      </div>
      <div className="h-96 w-full overflow-hidden rounded-md border">
        <ReactSketchCanvas
          canvasColor="#FFFFFF"
          eraserWidth={12}
          onStroke={() => {
            setError(undefined);
          }}
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
          setError(undefined);
          const canvas = canvasReference.current;
          const image = await canvas?.exportImage('png');
          const sketchingTime = await canvas?.getSketchingTime();
          const paths = await canvas?.exportPaths();
          const strokeCount = paths?.length;
          if (!image || !sketchingTime || !strokeCount) {
            return;
          }
          if (strokeCount < 5 || sketchingTime < 5000) {
            setError('정확한 테스트를 위해 조금만 더 그려주세요! 🎨');
            return;
          }
          const sketchId = await mutateAsync({
            image,
            sketchingTime,
            strokeCount,
          });
          router.push(`/sketches/${sketchId}`);
        }}
      >
        {isPending ? '분석 중...' : '분석하기'}
      </Button>
      <p className="text-sm text-destructive">{error}</p>
    </div>
  );
}
