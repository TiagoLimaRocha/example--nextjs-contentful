module.exports = {
  printWidth: 100,
  tabWidth: 2,
  quoteProps: 'consistent',
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: "always",
  overrides: [
    {
      files: '*.{js,jsx,tsx,ts,scss,json,html}',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
