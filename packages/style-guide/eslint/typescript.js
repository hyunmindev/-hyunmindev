const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    project,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'unicorn/prevent-abbreviations': ['error', { allowList: { env: true } }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};
