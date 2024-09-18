'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { Eraser, Pencil, Redo, Trash2, Undo } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from 'react-sketch-canvas';

export default function Page() {
  const [result, setResult] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [strokeColor, setStrokeColor] = useState<string>('#8B4513');
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');

  const canvasReference = useRef<ReactSketchCanvasRef>(null);

  useEffect(() => {
    canvasReference.current?.eraseMode(mode === 'erase');
  }, [mode]);

  return (
    <div className="flex size-full flex-col gap-4 p-6">
      <div className="flex flex-wrap gap-2">
        <div className="size-10 overflow-hidden rounded-full border">
          <input
            className="size-[200%] -translate-x-1/4 -translate-y-1/4 appearance-none"
            onChange={(event) => {
              setStrokeColor(event.target.value);
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
          canvasColor="transparent"
          eraserWidth={12}
          ref={canvasReference}
          strokeColor={strokeColor}
          style={{ border: 'unset' }}
          withTimestamp
        />
      </div>
      {!result && (
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const sketch = await canvasReference.current?.exportImage('jpeg');
            const sketchingTime =
              await canvasReference.current?.getSketchingTime();
            const strokeCount = await canvasReference.current
              ?.exportPaths()
              .then((paths) => paths.length);
            const testResult = await fetch('/api/v1/analyze', {
              body: JSON.stringify({ sketch, sketchingTime, strokeCount }),
              method: 'POST',
            }).then<string>((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Failed to fetch');
            });
            setResult(testResult);
            setIsLoading(false);
          }}
        >
          {isLoading ? '분석 중...' : '분석하기'}
        </Button>
      )}
      {!!result && (
        <Button
          className="w-full"
          onClick={() => {
            setResult(undefined);
          }}
        >
          다시하기
        </Button>
      )}
      {!!result && (
        <div
          className="whitespace-pre-wrap rounded-md border p-4"
          dangerouslySetInnerHTML={{ __html: result }}
        />
      )}
    </div>
  );
}
