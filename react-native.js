import { reactBaseConfig } from "./react.js";
import reactNative from "eslint-plugin-react-native";
import globals from "globals";

/**
 * @param {string|string[]} [projectPaths="./tsconfig.json"] - One or more tsconfig paths.
 * @returns {import('eslint').Linter.FlatConfig[]} An array of ESLint flat config objects.
 */
export default function reactNativeConfig(projectPaths) {
  return [
    ...reactBaseConfig(projectPaths),
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        "react-native": reactNative,
      },
      rules: {
        ...reactNative.configs.all.rules,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
          ...globals.node,
          ...reactNative.environments["react-native"].globals,
        },
      },
    },
  ];
}
