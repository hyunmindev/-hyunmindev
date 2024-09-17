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
      },
    },
  ],
  rules: {
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/order': 'off',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    quotes: ['error', 'single'],
    'sonarjs/deprecation': 'off',
    'sonarjs/no-misused-promises': 'off',
  },
};
