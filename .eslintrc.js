module.exports = {
    'extends': [
        './node_modules/@mlz/lint/ts-eslintrc-react.js',
    ],
    plugins: [
        'jest',
    ],
    'rules': {
        'react/prop-types': 0,
        "react/no-multi-comp":0,
        "@typescript-eslint/no-empty-function":0
      },
};
  