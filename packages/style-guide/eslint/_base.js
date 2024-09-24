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
    camelcase: ['error', { ignoreImports: true, properties: 'never' }],
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/order': 'off',
    'no-console': ['error', { allow: ['error', 'info'] }],
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'prefer-destructuring': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'sonarjs/deprecation': 'off',
    'sonarjs/no-misused-promises': 'off',
    'sonarjs/no-redundant-type-constituents': 'off',
    'sonarjs/pseudo-random': 'off',
  },
};
