import { fixupPluginRules } from "@eslint/compat";
import baseConfig from "./index.js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

// eslint-plugin-react calls rule-context methods that ESLint 10 removed, so
// the plugin is wrapped. It is wrapped once, at module level, because every
// config object must share one plugin object.
const react = fixupPluginRules(reactPlugin);

/**
 * @param {string|string[]} [projectPaths="./tsconfig.json"] - One or more tsconfig paths.
 * @returns {import('eslint').Linter.Config[]} An array of ESLint flat config objects.
 */
export function reactBaseConfig(projectPaths) {
  return [
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      settings: {
        react: { version: "detect" },
        ...reactPlugin.configs.recommended.settings,
        ...reactHooks.configs.recommended.settings,
        ...reactPlugin.configs["jsx-runtime"].settings,
      },
      plugins: {
        react,
        "react-hooks": reactHooks,
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        ...reactPlugin.configs["jsx-runtime"].rules,
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/self-closing-comp": "warn",
        // TypeScript rules are defined in baseConfig (index.js)
      },
    },
    ...baseConfig(projectPaths),
  ];
}

/**
 * @param {string|string[]} [projectPaths="./tsconfig.json"] - One or more tsconfig paths.
 * @returns {import('eslint').Linter.Config[]} An array of ESLint flat config objects.
 */
export default function reactConfig(projectPaths) {
  return [
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      languageOptions: {
        globals: globals.browser,
      },
      plugins: {
        "react-refresh": reactRefresh,
      },
      rules: {
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        // TypeScript rules are defined in baseConfig (index.js)
      },
    },
    ...reactBaseConfig(projectPaths),
  ];
}
