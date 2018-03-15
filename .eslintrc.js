module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    // "plugins": ["react"],
    "plugins": ["html"],
    "rules": {
        "indent": ["off", 2, { "SwitchCase": 1 }],
        "linebreak-style": ["warn", "unix"],
        "quotes": ["warn", "single"],
        "semi": ["off", "never"],
        "no-console": ["warn"],
        "no-unused-vars": ["warn"],
    }
}