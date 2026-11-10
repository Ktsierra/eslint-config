import assert from "node:assert/strict";
import { test } from "node:test";
import reactConfig, { reactBaseConfig } from "../react.js";
import { assertReports, enabledRules, fixture } from "./helpers.js";

const tsconfig = fixture("react", "tsconfig.json");
const sample = fixture("react", "Sample.tsx");
const plain = fixture("react", "Plain.jsx");

test("react entry reports the expected rules on TSX", async () => {
  await assertReports(reactConfig(tsconfig), sample, [
    // the seven that throw under ESLint 10 when the plugin is not wrapped
    "react/display-name",
    "react/no-deprecated",
    "react/no-direct-mutation-state",
    "react/no-render-return-value",
    "react/no-string-refs",
    "react/no-unknown-property",
    "react/require-render-return",
    "react/jsx-key",
    "react/jsx-no-comment-textnodes",
    "react/jsx-no-duplicate-props",
    "react/jsx-no-target-blank",
    "react/jsx-no-undef",
    "react/no-children-prop",
    "react/no-danger-with-children",
    "react/no-find-dom-node",
    "react/no-is-mounted",
    "react/no-unescaped-entities",
    "react/self-closing-comp",
    "react-hooks/rules-of-hooks",
    "react-hooks/exhaustive-deps",
    "react-hooks/set-state-in-effect",
    "react-refresh/only-export-components",
  ]);
});

test("react entry reports on plain .jsx files", async () => {
  await assertReports(reactConfig(tsconfig), plain, ["react/jsx-key", "react/no-string-refs"]);
});

test("a project can turn on a react rule the config does not enable", async () => {
  const config = [
    ...reactConfig(tsconfig),
    { files: ["**/*.jsx"], rules: { "react/jsx-curly-spacing": ["error", { when: "never" }] } },
  ];
  await assertReports(config, plain, ["react/jsx-curly-spacing"]);
});

test("the react entry can be combined with itself", async () => {
  await assertReports([...reactConfig(tsconfig), ...reactConfig(tsconfig)], plain, ["react/jsx-key"]);
});

test("reactBaseConfig is the react entry without react-refresh", async () => {
  const rules = await enabledRules(reactBaseConfig(tsconfig), sample);
  assert.ok("react/jsx-key" in rules);
  assert.ok(!("react-refresh/only-export-components" in rules));
});
