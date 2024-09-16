/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve('@vercel/style-guide/eslint/react')],
  rules: {
    'react/jsx-curly-brace-presence': 'error',
  },
};
