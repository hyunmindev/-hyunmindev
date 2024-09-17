'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from 'react-sketch-canvas';

const STROKE_COLORS = [
  '#8B4513',
  '#D2B48C',
  '#228B22',
  '#ADFF2F',
  '#FF4500',
  '#87CEEB',
] as const;

export default function Page() {
  const [result, setResult] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [strokeColor, setStrokeColor] = useState<
    (typeof STROKE_COLORS)[number]
  >(STROKE_COLORS[0]);
  const canvasReference = useRef<ReactSketchCanvasRef>(null);

  return (
    <div className="flex size-full flex-col items-center gap-4 p-6">
      <div className="flex flex-wrap gap-2">
        {STROKE_COLORS.map((color) => (
          <Button
            className="rounded-full border"
            key={color}
            onClick={() => {
              setStrokeColor(color);
            }}
            size="icon"
            style={{ backgroundColor: color }}
          />
        ))}
        <Button
          className="rounded-full"
          onClick={() => {
            canvasReference.current?.resetCanvas();
          }}
          size="icon"
          variant="outline"
        >
          <X className="stroke-border" />
        </Button>
      </div>
      <div className="h-96 w-full rounded-md border">
        <ReactSketchCanvas
          canvasColor="transparent"
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
            const testResult = await fetch('/api/v1/test', {
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
          분석하기
        </Button>
      )}
      {!!result && (
        <Button
          className="w-full"
          onClick={() => {
            canvasReference.current?.clearCanvas();
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
