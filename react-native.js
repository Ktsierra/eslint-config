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
        globals: {
          ...globals.browser,
          ...globals["react-native"],
        },
      },
      plugins: {
        "react-native": reactNative,
      },
      rules: {
        ...reactNative.configs.all.rules,
      },
    },
  ];
}