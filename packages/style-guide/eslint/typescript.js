const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      extends: [
        require.resolve('@vercel/style-guide/eslint/typescript'),
        'plugin:unicorn/recommended',
      ],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {
            project,
          },
        },
      },
    },
  ],
};
