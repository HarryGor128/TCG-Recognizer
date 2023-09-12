module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/self-closing-comp': [
      'error',
      {
        component: false,
        html: false,
      },
    ],
  },
};
