/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@hyunmin-dev/style-guide/eslint/browser'),
    require.resolve('@hyunmin-dev/style-guide/eslint/node'),
    require.resolve('@hyunmin-dev/style-guide/eslint/react'),
    require.resolve('@hyunmin-dev/style-guide/eslint/typescript'),
    require.resolve('@hyunmin-dev/style-guide/eslint/next'),
  ],
};
