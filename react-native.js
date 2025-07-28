import { reactBaseConfig } from "./react.js";
import reactNative from "eslint-plugin-react-native";
import globals from "globals";


/**
 * @param {string|string[]} projectPaths - One or more tsconfig paths (e.g., './tsconfig.app.json', './tsconfig.json')
 */
export default function reactNativeConfig(projectPaths) {
  return [
    ...reactBaseConfig(projectPaths),
        
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      languageOptions: {
        globals: globals["react-native"],
      },
      plugins: {
        "react-native": reactNative,
      },
      rules: {
        "react-native/no-unused-styles": "error",
        "react-native/split-platform-components": "error",
        "react-native/no-inline-styles": "warn",
      },
    },
  ];
}
