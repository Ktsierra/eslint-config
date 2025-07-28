import { reactBaseConfig } from "./react.js";
import reactNative from "eslint-plugin-react-native";

/**
 * @param {string|string[]} projectPaths - One or more tsconfig paths (e.g., './tsconfig.app.json', './tsconfig.json')
 */
export default function reactNativeConfig(projectPaths) {
  return [
    ...reactBaseConfig(projectPaths),
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        "react-native": reactNative,
      },
      extends: ["plugin:react-native/all"],
      env: {
        "react-native/react-native": true,
      },
    },
  ];
}
