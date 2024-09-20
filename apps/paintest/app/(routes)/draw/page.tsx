'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from 'react-sketch-canvas';

import { type AnalyzeParameters, type DrawMode } from '~/_types';
import { getAnalyzeParameters } from '~/_utils';
import { metch } from '~/_utils/metch';

import { DrawToolbox } from './_components/DrawToolbox';

export default function Draw() {
  const canvasReference = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState<string>('#8B4513');
  const [mode, setMode] = useState<DrawMode>('stroke');
  const [error, setError] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    canvasReference.current?.eraseMode(mode === 'erase');
  }, [mode]);

  useEffect(() => {
    setError(undefined);
  }, [mode, strokeColor]);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (body: AnalyzeParameters) =>
      metch<string>({ body, method: 'POST', path: '/api/v1/analyze' }),
  });

  const handleClick = async () => {
    setError(undefined);
    const canvas = canvasReference.current;
    if (!canvas) {
      setError('에러가 발생했습니다. 새로고침 해주세요. 😢');
      return;
    }
    const { image, sketchingTime, strokeCount } =
      await getAnalyzeParameters(canvas);
    if (strokeCount < 4 || sketchingTime < 4000) {
      setError('정확한 테스트를 위해 조금만 더 그려주세요! 🎨');
      return;
    }
    try {
      const sketchId = await mutateAsync({ image, sketchingTime, strokeCount });
      router.push(`/sketches/${sketchId}`);
    } catch {
      setError('에러가 발생했습니다. 새로고침 해주세요. 😢');
    }
  };

  return (
    <>
      <h1>나무를 그려주세요! 🎄</h1>
      <DrawToolbox
        mode={mode}
        onChangeMode={setMode}
        onChangeStrokeColor={setStrokeColor}
        onRedo={() => {
          canvasReference.current?.redo();
          setError(undefined);
        }}
        onReset={() => {
          canvasReference.current?.resetCanvas();
          setError(undefined);
        }}
        onUndo={() => {
          canvasReference.current?.undo();
          setError(undefined);
        }}
        strokeColor={strokeColor}
      />
      <div className="simple-border h-96 w-full">
        <ReactSketchCanvas
          canvasColor="transparent"
          className="opacity-90"
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
      <Button className="w-full" disabled={isPending} onClick={handleClick}>
        {isPending ? '분석 중...' : '분석하기'}
      </Button>
      <p className="text-sm text-destructive">{error}</p>
    </>
  );
}
