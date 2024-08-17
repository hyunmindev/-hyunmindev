/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve('@vercel/style-guide/eslint/next')],
  overrides: [
    {
      files: [
        'app/**/page.{j,t}sx',
        'app/**/layout.{j,t}sx',
        'next.config.{mjs,ts}',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
