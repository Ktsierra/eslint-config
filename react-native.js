import { reactBaseConfig } from "./react.js";
import * as reactNative from "eslint-plugin-react-native";
import globals from "globals";

/**
 * @param {string|string[]} projectPaths - One or more tsconfig paths (e.g., './tsconfig.app.json', './tsconfig.json')
 */
export default function reactNativeConfig(projectPaths) {
  return [
    ...reactBaseConfig(projectPaths),
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        "react-native": reactNative,
      },
      languageOptions: {
        globals: {
          ...globals.browser,
          ...reactNative.environments["react-native"].globals,
        },
      },
      rules: reactNative.configs.all.rules,
    },
  ];
}
