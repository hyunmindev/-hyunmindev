// @ts-check

import createJiti from 'jiti';
import { fileURLToPath } from 'node:url';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./app/env');

/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ['@hyunmin-dev/ui'],
};
