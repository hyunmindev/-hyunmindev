import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/_server/api/trpc';
import { selectSketch } from '~/_services/supabase';
import { analyzeParametersSchema } from '~/_types/schemas';

export const sketchesRouter = createTRPCRouter({
  create: publicProcedure.input(analyzeParametersSchema).mutation(async () => {
    // Upload the sketch to Supabase
  }),

  detail: publicProcedure
    .input(z.object({ sketchId: z.string() }))
    .query(async ({ input }) => selectSketch(input)),
});
