import assert from "node:assert/strict";
import { test } from "node:test";
import baseConfig from "../index.js";
import { assertReports, createLinter, enabledRules, fixture, reportedRules } from "./helpers.js";

const tsconfig = fixture("base", "tsconfig.json");
const sample = fixture("base", "sample.ts");

test("base entry reports the expected rules on TypeScript", async () => {
  await assertReports(baseConfig(tsconfig), sample, [
    "no-unassigned-vars",
    "no-useless-assignment",
    "preserve-caught-error",
    "@typescript-eslint/no-floating-promises",
    "@typescript-eslint/no-non-null-assertion",
    "@typescript-eslint/no-empty-function",
    "@typescript-eslint/consistent-type-imports",
  ]);
});

test("base entry keeps unused-variable rules off for TypeScript", async () => {
  const rules = await enabledRules(baseConfig(tsconfig), sample);
  assert.ok(!("@typescript-eslint/no-unused-vars" in rules));
  const reported = await reportedRules(baseConfig(tsconfig), sample);
  assert.ok(!reported.has("@typescript-eslint/no-unused-vars"));
  assert.ok(!reported.has("no-unused-vars"));
});

test("base entry lints plain JavaScript", async () => {
  await assertReports(baseConfig(tsconfig), fixture("base", "plain.js"), ["no-undef", "no-unassigned-vars"]);
});

test("base entry keeps its call shapes", async () => {
  const cases = [
    [[], ["./tsconfig.json"]],
    [["a.json"], ["a.json"]],
    [[["a.json", "b.json"]], ["a.json", "b.json"]],
  ];
  for (const [args, expected] of cases) {
    const computed = await createLinter(baseConfig(...args)).calculateConfigForFile(sample);
    assert.deepEqual(computed.languageOptions.parserOptions.project, expected);
    assert.equal(computed.languageOptions.parserOptions.tsconfigRootDir, process.cwd());
  }
});
