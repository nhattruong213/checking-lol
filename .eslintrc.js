module.exports = {
  root: true,
  extends: ['next', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-console': 'error',
    'react/jsx-no-literals': 'error',
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'any', prev: '*', next: 'export' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
    ],
    'import/no-anonymous-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      excludedFiles: ['**/app/**/*.tsx'],
      rules: {
        'import/no-default-export': 'error',
      },
    },
  ],
};
