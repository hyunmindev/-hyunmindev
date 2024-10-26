import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/_server/api/trpc';
import { selectSketch } from '~/_services/supabase';

export const sketchesRouter = createTRPCRouter({
  create: publicProcedure.mutation(async () => {
    // Upload the sketch to Supabase
  }),

  detail: publicProcedure
    .input(z.object({ sketchId: z.string() }))
    .query(async ({ input }) => selectSketch(input)),
});
