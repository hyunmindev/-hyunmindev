import type { NextRequest } from 'next/server';

import { createServerClient } from '~/_configs/supabase';

export const GET = async (
  _: NextRequest,
  { params }: { params: { sketchId: string } },
) => {
  const sketchId = Number(params.sketchId);
  const supabase = createServerClient();
  const { data: records } = await supabase
    .from('sketches')
    .select()
    .eq('id', sketchId);
  const sketch = records?.[0];
  if (!sketch) {
    return Response.json('없음', { status: 404 });
  }
  return Response.json(sketch);
};
