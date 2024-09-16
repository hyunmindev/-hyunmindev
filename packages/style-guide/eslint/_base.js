/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/_base'),
    'plugin:perfectionist/recommended-natural-legacy',
    'turbo',
    'plugin:sonarjs/recommended-legacy',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.config.{mjs,ts,js}'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-named-as-default': 'off',
      },
    },
  ],
  rules: {
    'import/no-cycle': 'off',
    'import/order': 'off',
    quotes: ['error', 'single'],
    'sonarjs/deprecation': 'off',
  },
};
