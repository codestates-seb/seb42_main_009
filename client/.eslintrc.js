module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    // 함수형 컴포넌트 정의방식 선언
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    // label 에러 해결
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
    // import 에러 해결
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
  },
  settings: {
    // 'import/core-m'
    'import/core-modules': [
      'styled-components',
      'react-router-dom',
      'chart.js/auto',
      'zustand',
      'axios',
      'tailwind-styled-components',
      'dompurify',
      'react-google-recaptcha',
    ], // import 오류나는 패키지를 여기에 추가해줘야함
  },
};
