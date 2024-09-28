import { nanoid } from 'nanoid';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/_server/api/trpc';
import { analyze } from '~/_services/openai';
import { insertSketch, selectSketch, uploadSketch } from '~/_services/supabase';
import { analyzeParametersSchema } from '~/_types/schemas';
import { base64ToBlob } from '~/_utils';

export const sketchesRouter = createTRPCRouter({
  create: publicProcedure
    .input(analyzeParametersSchema)
    .mutation(async ({ input }) => {
      const { image, sketchingTime, strokeCount } = input;
      const result = await analyze({ image, sketchingTime, strokeCount });
      const id = nanoid(8);
      await insertSketch({ id, result, sketchingTime, strokeCount });
      await uploadSketch({ file: base64ToBlob(image), fileName: id });
      return id;
    }),

  detail: publicProcedure
    .input(z.object({ sketchId: z.string() }))
    .query(async ({ input }) => selectSketch(input)),
});
