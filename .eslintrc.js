module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['off'],
    'semi': ['error', 'never'],
    'no-debugger': 'off',
    'require-jsdoc': ['off', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': false,
        'ClassDeclaration': false,
        'ArrowFunctionExpression': false,
        'FunctionExpression': false,
      },
    }],
  },
}
