module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:tailwindcss/recommended',
    'prettier'
  ],
  env: {
    browser: true,
    es2021: true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json'
      }
    }
  ],
  plugins: ['sort-keys-fix', 'tailwindcss', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'tailwindcss/no-custom-classname': 0,
    'tailwindcss/classnames-order': 2,
    'no-console': 0,
    'radix': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-underscore-dangle': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false }
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/button-has-type': 0,
    'react/no-unstable-nested-components': [
      2,
      {
        allowAsProps: true
      }
    ],
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    '@typescript-eslint/no-loop-func': 0,
    'sort-keys': [2, 'asc', { natural: true, allowLineSeparatedGroups: true }],
    'sort-keys-fix/sort-keys-fix': 1,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        ignoreCase: true,
        reservedFirst: true
      }
    ],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/export': 0,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal'
          }
        ],
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  }
}
