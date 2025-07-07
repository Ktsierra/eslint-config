import baseConfig from "./index.js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

/**
 * @param {string|string[]} projectPaths - One or more tsconfig paths (e.g., './tsconfig.app.json', './tsconfig.json')
 */
export default function reactConfig(projectPaths) {
  return [
    ...baseConfig(projectPaths),
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      languageOptions: {
        globals: globals.browser,
      },
      settings: {
        react: { version: "detect" },
      },
      plugins: {
        react,
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,

        // Your custom React rules
        "react/prop-types": "off", // We use TypeScript
        "react/react-in-jsx-scope": "off", // Not needed in React 17+
      },
    },
  ];
}
