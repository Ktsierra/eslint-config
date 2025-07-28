import { reactBaseConfig } from "./react.js";
import reactNative from "eslint-plugin-react-native";
import { fixupPluginRules } from "@eslint/compat";
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
        // Use fixupPluginRules to make the plugin compatible with ESLint 9 flat config
        "react-native": fixupPluginRules(reactNative),
      },
      rules: {
        // Manually specify the React Native rules you want to enable
        "react-native/no-unused-styles": "error",
        "react-native/split-platform-components": "error",
        "react-native/no-inline-styles": "warn",
        "react-native/no-color-literals": "warn",
        "react-native/no-raw-text": "error",
        "react-native/no-single-element-style-arrays": "error",
      },
    },
  ];
}
