import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * @param {string|string[]} projectPaths - One or more tsconfig paths (e.g., './tsconfig.app.json', './tsconfig.json')
 */
export default function baseConfig(projectPaths = "./tsconfig.json") {
  const projects = Array.isArray(projectPaths) ? projectPaths : [projectPaths];

  return tseslint.config(
    { ignores: ["dist", "build", "node_modules"] },

    // Configuration for all JS/TS/JSX files (general parsing and non-type-aware rules)
    {
      files: ["**/*.{ts,tsx,js,jsx}"], // Apply to all relevant files
      extends: [
        js.configs.recommended, // General JavaScript rules
      ],
      languageOptions: {
        parser: tseslint.parser, // Use TypeScript parser for all
        parserOptions: {
          project: projects,
          tsconfigRootDir: process.cwd(),
          ecmaVersion: 2022,
          sourceType: "module", // Important for modern JS/TS
        },
        globals: globals.node,
      },
      rules: {
        // Add any general rules that apply to both JS and TS here
      },
    },

    // Configuration for TypeScript files (type-aware rules)
    {
      files: ["**/*.{ts,tsx}"], // Only apply type-aware rules to TS/TSX files
      extends: [
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
          },
        ],
      },
    },
  );
}