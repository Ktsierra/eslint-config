import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * @param {string|string[]} [projectPaths="./tsconfig.json"] - One or more tsconfig paths.
 * @returns {import('eslint').Linter.FlatConfig[]} An array of ESLint flat config objects.
 */
export default function baseConfig(projectPaths = "./tsconfig.json") {
  const projects = Array.isArray(projectPaths) ? projectPaths : [projectPaths];

  return tseslint.config(
    { ignores: ["dist", "build", "node_modules"] },

    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      extends: [js.configs.recommended],
      languageOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        sourceType: "module",
        globals: globals.node,
      },
      rules: {},
    },

    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ],
      languageOptions: {
        parserOptions: {
          project: projects,
          tsconfigRootDir: process.cwd(),
        },
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-confusing-void-expression": [
          "error",
          {
            ignoreArrowShorthand: true,
            ignoreVoidOperator: false,
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
