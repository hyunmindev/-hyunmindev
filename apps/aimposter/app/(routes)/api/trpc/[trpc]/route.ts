import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { env } from '~/_configs/env';
import { appRouter } from '~/_server/api/root';
import { createTRPCContext } from '~/_server/api/trpc';

const createContext = (request: NextRequest) =>
  createTRPCContext({ headers: request.headers });

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    createContext: () => createContext(request),
    endpoint: '/api/trpc',
    onError:
      env.NODE_ENV === 'development'
        ? ({ error, path }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            );
          }
        : undefined,
    req: request,
    router: appRouter,
  });

export { handler as GET, handler as POST };
