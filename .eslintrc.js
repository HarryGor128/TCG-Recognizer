module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        // 'react/self-closing-comp': [
        //     'error',
        //     {
        //         component: false,
        //         html: false,
        //     },
        // ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'off',
        'react-hooks/exhaustive-deps': 'off',
    },
};
