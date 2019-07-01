module.exports = {
  plugins: ['react'],
  rules: {
    'no-var': 'warn',
    'no-unused-vars': 'warn',
    'no-unused-vars': 'warn',

    // react plugin - options
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-key': 'warn',
    'react/jsx-no-undef': 'error',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 8, // optional, recommended 6+
  },
}
