import { notFound } from 'next/navigation';
import { cache } from 'react';

import { createServerClient } from '~/_configs/supabase';

export const readSketch = cache(async (sketchId: number) => {
  const supabase = createServerClient();
  const { data: records } = await supabase
    .from('sketches')
    .select()
    .eq('id', sketchId);
  if (!records?.[0]) {
    return notFound();
  }
  return records[0];
});
