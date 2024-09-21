/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@hyunmin-dev/style-guide/eslint/browser'),
    require.resolve('@hyunmin-dev/style-guide/eslint/node'),
    require.resolve('@hyunmin-dev/style-guide/eslint/react'),
    require.resolve('@hyunmin-dev/style-guide/eslint/next'),
    require.resolve('@hyunmin-dev/style-guide/eslint/tailwind'),
  ],
  ignorePatterns: ['next-env.d.ts', 'app/_types/supabase.ts'],
  overrides: [
    {
      extends: [require.resolve('@hyunmin-dev/style-guide/eslint/typescript')],
      files: ['*.ts', '*.tsx'],
    },
  ],
};
