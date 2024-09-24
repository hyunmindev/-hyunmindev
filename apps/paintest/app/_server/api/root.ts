import { sketchesRouter } from '~/_server/api/routers/sketches';
import { createCallerFactory, createTRPCRouter } from '~/_server/api/trpc';

export const appRouter = createTRPCRouter({
  sketches: sketchesRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
