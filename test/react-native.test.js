import { test } from "node:test";
import reactConfig from "../react.js";
import reactNativeConfig from "../react-native.js";
import { assertReports, fixture } from "./helpers.js";

const tsconfig = fixture("react-native", "tsconfig.json");
const sample = fixture("react-native", "Sample.tsx");
const nativeRules = [
  "react-native/no-unused-styles",
  "react-native/no-inline-styles",
  "react-native/no-color-literals",
  "react-native/sort-styles",
  "react-native/split-platform-components",
  "react-native/no-raw-text",
  "react-native/no-single-element-style-arrays",
];

test("react-native entry reports the expected rules", async () => {
  await assertReports(reactNativeConfig(tsconfig), sample, [...nativeRules, "react-hooks/rules-of-hooks"]);
});

test("the react-native entry can be combined with itself and with the react entry", async () => {
  await assertReports([...reactNativeConfig(tsconfig), ...reactNativeConfig(tsconfig)], sample, nativeRules);
  await assertReports([...reactConfig(tsconfig), ...reactNativeConfig(tsconfig)], sample, nativeRules);
});
