module.exports = {
    'extends': [
        './node_modules/@mlz/lint/ts-eslintrc-react.js',
    ],
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
    plugins: [
        'jest',
    ],
};
  