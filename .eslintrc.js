module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
    "react/prop-types": "off",
    // Add any additional rules or overrides here
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
