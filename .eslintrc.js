// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    
    "indent": ["error", "tab"],
    "no-tabs": 0,

    // don't allow semicolons
    'semi': ['error', 'never'],

    // don't require comma in the last line of an object/dictionary declaration
    'comma-dangle': ['error', 'only-multiline'],

    // ignore max-len for comments
    'max-len': [
        'warn',
        {
            'code': 120,
            'ignoreComments': true,
            'ignoreTrailingComments': true,
            'ignoreUrls': true,
            'ignoreStrings': true
        }
    ],

    // force space after and before curly braces in object/dict declarations
    'object-curly-spacing': ['error', 'always'],

    'require-jsdoc': 0,

    'no-console': 0,
  }
}
