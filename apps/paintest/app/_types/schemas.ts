import { z } from 'zod';

export const analyzeParametersSchema = z.object({
  image: z.string(),
  sketchingTime: z.number(),
  strokeCount: z.number(),
});

export type AnalyzeParameters = z.infer<typeof analyzeParametersSchema>;
