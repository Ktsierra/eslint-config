import { test } from "node:test";
import baseConfig from "../index.js";
import reactNativeConfig from "../react-native.js";
import reactConfig from "../react.js";
import { assertReports, fixture } from "./helpers.js";

// A command-line `eslint` run uses typescript-eslint's single-run mode. helpers.js turns that
// mode off for the other tests, so this file turns it back on and lints each type-aware fixture
// exactly once. Do not lint a fixture twice here: a second parse in this mode is what crashes.
test("each entry lints in single-run mode, the mode a command-line run uses", async () => {
  process.env.TSESTREE_SINGLE_RUN = "true";
  await assertReports(baseConfig(fixture("base", "tsconfig.json")), fixture("base", "sample.ts"), [
    "@typescript-eslint/no-floating-promises",
  ]);
  await assertReports(reactConfig(fixture("react", "tsconfig.json")), fixture("react", "Sample.tsx"), [
    "@typescript-eslint/no-unsafe-call",
    "react/no-deprecated",
  ]);
  await assertReports(
    reactNativeConfig(fixture("react-native", "tsconfig.json")),
    fixture("react-native", "Sample.tsx"),
    ["@typescript-eslint/no-unsafe-member-access", "react-native/no-unused-styles"],
  );
});
