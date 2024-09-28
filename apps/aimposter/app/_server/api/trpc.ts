import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

export const createTRPCContext = (options: { headers: Headers }) => ({
  ...options,
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : undefined,
      },
    };
  },
  transformer: superjson,
});

export const { createCallerFactory } = t;

export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => {
      setTimeout(resolve, waitMs);
    });
  }
  const result = await next();
  const end = Date.now();
  console.info(`[TRPC] ${path} took ${(end - start).toString()}ms to execute`);
  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);
