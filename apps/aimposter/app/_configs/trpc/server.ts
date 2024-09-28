import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { headers } from 'next/headers';
import { cache } from 'react';
import 'server-only';

import { createQueryClient } from '~/_configs/trpc/query-client';
import { type AppRouter, createCaller } from '~/_server/api/root';
import { createTRPCContext } from '~/_server/api/trpc';

const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { HydrateClient, trpc: api } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
