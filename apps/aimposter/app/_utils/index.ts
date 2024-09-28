import type { ReactSketchCanvasRef } from 'react-sketch-canvas';

import { toast } from '@hyunmin-dev/ui/libs/sonner';

import { SHARE_TEXT, SHARE_TITLE } from '~/_constants/meta';
import { type AnalyzeParameters } from '~/_types/schemas';

export const base64ToBlob = (base64: string, mimeType = 'image/png') => {
  const [, base64Data] = base64.split(',');
  const byteCharacters = atob(base64Data ?? '');
  const byteNumbers: number[] = Array.from({ length: byteCharacters.length });
  for (let index = 0; index < byteCharacters.length; index += 1) {
    byteNumbers[index] = byteCharacters.codePointAt(index) ?? 0;
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const getAnalyzeParameters = async ({
  canvas,
}: {
  canvas: ReactSketchCanvasRef;
}): Promise<AnalyzeParameters> => {
  const [image, sketchingTime, paths] = await Promise.all([
    canvas.exportImage('png'),
    canvas.getSketchingTime(),
    canvas.exportPaths(),
  ]);
  const strokeCount = paths.length;
  return { image, sketchingTime, strokeCount };
};

export const shareSketch = async ({ sketchId }: { sketchId: string }) => {
  const shareData = {
    text: SHARE_TEXT,
    title: SHARE_TITLE,
    url: `${window.location.origin}/sketches/${sketchId}`,
  };
  if (typeof navigator.share === 'function') {
    await navigator.share(shareData);
    return;
  }
  if (typeof navigator.clipboard.writeText === 'function') {
    await navigator.clipboard.writeText(shareData.url);
    toast('공유 링크가 복사되었습니다.');
    return;
  }
  toast('공유하기 기능을 지원하지 않는 브라우저입니다.');
};
