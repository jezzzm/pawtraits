module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react', 'react-hooks', 'emotion'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  globals: {
    graphql: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
