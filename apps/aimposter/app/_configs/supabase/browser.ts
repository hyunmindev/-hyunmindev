import * as supabase from '@supabase/ssr';

import { env } from '~/_configs/env';

export const createBrowserClient = () => {
  return supabase.createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
};
