module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jsx-a11y', 'jsdoc'],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/semi': 1,
    'jsdoc/no-undefined-types': 1,
    'prettier/prettier': 1,
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.tsx',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
