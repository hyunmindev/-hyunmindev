/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/react'),
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    'react/jsx-curly-brace-presence': 'error',
  },
};
