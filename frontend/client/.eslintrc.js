module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./**/tsconfig.json']
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  plugins: [
    'react-hooks',
    'jimu-theme'
  ],
  extends: [
    'love'
  ],
  rules: {
    'jimu-theme/no-classic-variables': ['warn', { themeAliases: ['theme', 'theme2', 'builderTheme', 'appTheme', 'exbTheme'] }],
    'jimu-theme/no-classic-css-vars': 'warn',
    'jimu-theme/no-classic-css-utilities': 'warn',
    'jimu-theme/no-unnecessary-template-vars': 'warn',
    'jimu-theme/no-classic-variables-left': 'warn',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 0
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^jsx$'
      }
    ],
    '@typescript-eslint/consistent-indexed-object-style': [
      'error',
      'index-signature'
    ],
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/promise-function-async': 'off',

    'node/handle-callback-err': 'off',
    'node/no-callback-literal': 'off',
    'n/handle-callback-err': 'off',
    'n/no-callback-literal': 'off',

    'no-return-await': 'off',
    'no-case-declarations': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-optional-chain': 'off',
    'symbol-description': 'off',
    'no-template-curly-in-string': 'off',
    'spaced-comment': 'off',
    'no-fallthrough': 'off',
    'no-useless-escape': 'off',
    'object-shorthand': 'off'
  },
  overrides: [
    {
      files: ['**/translations/*.js'],
      extends: ['eslint:recommended'],
      globals: {
        System: 'readonly',
        define: 'readonly'
      },
      rules: {
        camelcase: 'off',
        'max-len': 'off',
        'quote-props': 'off',
        quotes: 'off',
        '@typescript-eslint/quotes': 'off',
        'no-useless-escape': 'off',
        semi: 'off',
        '@typescript-eslint/semi': 'off',
        'eol-last': 'off',
        'comma-dangle': 'off',
        'key-spacing': 'off',
        'block-spacing': 'off',
        '@typescript-eslint/block-spacing': 'off',
        'brace-style': 'off',
        '@typescript-eslint/brace-style': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': 'off'
      }
    },
    {
      files: ['**/translations/default.ts'],
      extends: ['eslint:recommended'],
      rules: {
        camelcase: 'off',
        'max-len': 'off',
        'quote-props': 'off',
        quotes: 'off',
        '@typescript-eslint/quotes': 'off',
        'comma-dangle': 'off',
        'no-useless-escape': 'off'
      }
    },
    {
      files: [
        'builder/themes/**/*.{ts,tsx}',
        'builder/widgets/theme-setting/src/runtime/components/theme-setting/**/*.{ts,tsx}',
        'jimu-theme/lib/classic/**/*.{ts,tsx}',
        'jimu-theme/lib/manager/**/*.{ts,tsx}',
        'jimu-theme/lib/system/**/*.{ts,tsx}',
        'jimu-theme/lib/tests/**/*.{ts,tsx}',
        'jimu-theme/lib/utils/**/*.{ts,tsx}',
        'extensions/themes/**/*.{ts,tsx}',
        'jimu-theme/lib/tests/classic/*.{ts,tsx}',
        'storybook/stories/theme/**/*.{ts,tsx}'
      ],
      excludedFiles: ['jimu-theme/lib/manager/components/*.{ts,tsx}', 'jimu-theme/lib/manager/global/mixin/*.{ts,tsx}'],
      rules: {
        'jimu-theme/no-classic-variables': 'off',
        'jimu-theme/no-classic-css-vars': 'off',
        'jimu-theme/no-classic-css-utilities': 'off',
        'jimu-theme/no-unnecessary-template-vars': 'off',
        'jimu-theme/no-classic-variables-left': 'off'
      }
    }
  ]
}
