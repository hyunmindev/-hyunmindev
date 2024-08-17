/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/_base'),
    'plugin:perfectionist/recommended-natural-legacy',
    'turbo',
    'plugin:sonarjs/recommended-legacy',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/order': 'off',
    quotes: ['error', 'single'],
  },
};
