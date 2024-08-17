/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@hyunmindev/style-guide/eslint/browser'),
    require.resolve('@hyunmindev/style-guide/eslint/node'),
    require.resolve('@hyunmindev/style-guide/eslint/react'),
    require.resolve('@hyunmindev/style-guide/eslint/typescript'),
    require.resolve('@hyunmindev/style-guide/eslint/next'),
  ],
};
