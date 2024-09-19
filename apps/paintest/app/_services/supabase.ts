import { notFound } from 'next/navigation';
import { cache } from 'react';

import { createServerClient } from '~/_configs/supabase';
import { type TablesInsert } from '~/_types/supabase';

const SKETCHES = 'sketches';

export const selectSketch = cache(
  async ({ sketchId }: { sketchId: string }) => {
    const supabase = createServerClient();
    const { data: records } = await supabase
      .from(SKETCHES)
      .select()
      .eq('id', sketchId);
    if (!records?.[0]) {
      return notFound();
    }
    return records[0];
  },
);

export const insertSketch = async ({
  id,
  result,
  sketchingTime,
  strokeCount,
}: TablesInsert<typeof SKETCHES>) => {
  const supabase = createServerClient();
  const { data: records } = await supabase
    .from(SKETCHES)
    .insert({ id, result, sketchingTime, strokeCount })
    .select();
  if (!records?.[0]) {
    return notFound();
  }
  return records[0];
};

export const uploadSketch = async ({
  file,
  fileName,
}: {
  file: Blob;
  fileName: string;
}) => {
  const supabase = createServerClient();
  await supabase.storage.from(SKETCHES).upload(fileName, file);
};
