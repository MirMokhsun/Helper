module.exports = {
    parser: "babel-eslint",
    extends: [
      'airbnb',
      "plugin:react-native/all",
      'prettier',
      'prettier/babel',
      'prettier/react',
      'prettier/standard',
      "react-native-prettier"
    ],
    plugins: [
      'babel',
      'prettier',
      'react',
      'standard',
      'jsx-a11y',
      "react-native"
    ],
    parserOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    env: {
      jest: true,
      node: true,
      es6: true,
      browser: true,
    },
    globals: {
      fetch: true,
      expect: true,
      React: true,
      jest: true
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          arrowParens: "avoid",
          bracketSpacing: true,
          jsxBracketSameLine: false,
          jsxSingleQuote: true,
          printWidth: 100,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "all",
          useTabs: false,
          endOfLine: "lf"
        }
      ],
      "react/prop-types": "warn",
      "import/prefer-default-export": "warn",
      "react/sort-comp":"warn",
      "no-nested-ternary":"warn",
      "no-underscore-dangle":"off",
      "react/jsx-filename-extension": "off",
      "no-shadow": "off",
      "no-useless-constructor": "off",
      "import/no-named-as-default": "off",
      "linebreak-style": "off",
      "prettier/prettier": "off",
      "react-native/no-inline-styles": "off",
      "import/order": "off",
      "react-native/no-color-literals": "off",
      "import/prefer-default-export": "off",
      "react-native/sort-styles": "off",
    }
  };