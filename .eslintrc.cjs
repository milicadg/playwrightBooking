/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:playwright/playwright-test'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
      '@typescript-eslint/no-unused-expressions': 'error',
      'sort-keys': 'off',
      'no-duplicate-imports':
      [
        'error',
        {
            'includeExports': true
        }
      ],
      'comma-dangle': [
        'error',
        'never'
    ],
    'quotes': [
        'error',
        'single'
    ],
    'semi': [
        'error',
        'always'
    ],
      '@typescript-eslint/no-unused-vars': 'error',
      'playwright/no-restricted-matchers': [
        'error',
        {
          'toBeFalsy': 'Use `toBe(false)` instead.',
          'not': null
        }
      ],
      'playwright/require-top-level-describe':'error',
      'playwright/no-conditional-in-test':'error',
      'playwright/max-nested-describe': ['error', { 'max': 1 }]
    }
  };