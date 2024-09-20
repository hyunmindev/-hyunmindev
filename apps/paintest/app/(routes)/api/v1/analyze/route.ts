import { nanoid } from 'nanoid';
import { type NextRequest } from 'next/server';

import { analyze } from '~/_services/openai';
import { insertSketch, uploadSketch } from '~/_services/supabase';
import { type AnalyzeParameters } from '~/_types';
import { base64ToBlob } from '~/_utils';

export const POST = async (request: NextRequest) => {
  const { image, sketchingTime, strokeCount } =
    (await request.json()) as AnalyzeParameters;
  const result = await analyze({ image, sketchingTime, strokeCount });
  const id = nanoid(8);
  await insertSketch({ id, result, sketchingTime, strokeCount });
  await uploadSketch({ file: base64ToBlob(image), fileName: id });
  return Response.json(id);
};
