/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve('@vercel/style-guide/eslint/next')],
  overrides: [
    {
      files: ['page.{j,t}sx', 'layout.{j,t}sx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
