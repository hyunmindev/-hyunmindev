export interface AnalyzeParameters {
  image: string;
  sketchingTime: number;
  strokeCount: number;
}

export type DrawMode = 'erase' | 'stroke';
