import reactConfig from "./react.js";
import reactNative from "eslint-plugin-react-native";

export default [
  ...reactConfig,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-native": reactNative,
    },
    rules: {
      ...reactNative.configs.recommended.rules,
      "react-native/no-unused-styles": "error",
      "react-native/split-platform-components": "error",
      "react-native/no-inline-styles": "warn",
    },
  },
];
