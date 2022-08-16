'use strict';

module.exports = {
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: false,
      },
    },
  ],
};
