import * as supabase from '@supabase/ssr';
import { cookies } from 'next/headers';

import { env } from '~/_configs/env';
import { type Database } from '~/_types/database.types';

export const createServerClient = () => {
  const cookieStore = cookies();
  return supabase.createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, options, value } of cookiesToSet) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- 임시
              cookieStore.set(name, value, options);
            }
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
