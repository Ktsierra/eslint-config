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
    {
      extends: [
        js.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ],
      files: ["src/**/*.{ts,tsx}", "test/**/*.{ts,tsx}"],
      languageOptions: {
        parserOptions: {
          project: projects,
          tsconfigRootDir: process.cwd(),
        },
        ecmaVersion: 2022,
        globals: globals.node,
      },
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
