import baseConfig from "./index.js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

/**
 * @param {string|string[]} [projectPaths="./tsconfig.json"] - One or more tsconfig paths.
 * @returns {import('eslint').Linter.FlatConfig[]} An array of ESLint flat config objects.
 */
export function reactBaseConfig(projectPaths) {
  return [
    ...baseConfig(projectPaths),
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      settings: {
        react: { version: "detect" },
        ...react.configs.recommended.settings,
        ...reactHooks.configs.recommended.settings,
        ...react.configs["jsx-runtime"].settings,
      },
      plugins: {
        react,
        "react-hooks": reactHooks,
      },
      rules: {
        ...react.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/self-closing-comp": "warn",
      },
    },
  ];
}


/**
 * @param {string|string[]} [projectPaths="./tsconfig.json"] - One or more tsconfig paths.
 * @returns {import('eslint').Linter.FlatConfig[]} An array of ESLint flat config objects.
 */
export default function reactConfig(projectPaths) {
  return [
    ...reactBaseConfig(projectPaths),
        
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
      },
    },
  ];
}
