import type { ReactSketchCanvasRef } from 'react-sketch-canvas';

import { type AnalyzeParameters } from '~/_types';

export const base64ToBlob = (base64: string, mimeType = 'image/png') => {
  const base64Data = base64.split(',')[1];
  const byteCharacters = atob(base64Data ?? '');
  const byteNumbers: number[] = Array.from({ length: byteCharacters.length });
  for (let index = 0; index < byteCharacters.length; index += 1) {
    byteNumbers[index] = byteCharacters.codePointAt(index) ?? 0;
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const getAnalyzeParameters = async (
  canvas: ReactSketchCanvasRef,
): Promise<AnalyzeParameters> => {
  const [image, sketchingTime, paths] = await Promise.all([
    canvas.exportImage('png'),
    canvas.getSketchingTime(),
    canvas.exportPaths(),
  ]);
  const strokeCount = paths.length;
  return { image, sketchingTime, strokeCount };
};
