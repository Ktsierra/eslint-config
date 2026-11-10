import { fixupPluginRules } from "@eslint/compat";
import { reactBaseConfig } from "./react.js";
import reactNativePlugin from "eslint-plugin-react-native";
import globals from "globals";

// eslint-plugin-react-native calls rule-context methods that ESLint 10 removed,
// so the plugin is wrapped. It is wrapped once, at module level, because every
// config object must share one plugin object.
const reactNative = fixupPluginRules(reactNativePlugin);

/**
 * @param {string|string[]} [projectPaths="./tsconfig.json"] - One or more tsconfig paths.
 * @returns {import('eslint').Linter.Config[]} An array of ESLint flat config objects.
 */
export default function reactNativeConfig(projectPaths) {
  return [
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        "react-native": reactNative,
      },
      rules: {
        ...reactNativePlugin.configs.all.rules,
        // TypeScript rules are defined in baseConfig (index.js)
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
          __DEV__: false,
          __METRO_GLOBAL_PREFIX__: false,
          HermesInternal: false,
        },
      },
    },
    ...reactBaseConfig(projectPaths),
  ];
}
