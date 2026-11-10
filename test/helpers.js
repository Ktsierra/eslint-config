import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";

// These tests lint the same fixtures several times in one process. typescript-eslint's
// "single-run" mode, which it turns on by itself when CI=true, is not built for that: on the
// second parse of a file it uses a one-file program, which crashes under TypeScript 6.
// Say explicitly that this is not a single run, so the tests behave the same locally and in CI.
process.env.TSESTREE_SINGLE_RUN = "false";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function fixture(...segments) {
  return path.join(repoRoot, "test", "fixtures", ...segments);
}

export function createLinter(config) {
  return new ESLint({ cwd: repoRoot, overrideConfigFile: true, overrideConfig: config });
}

export async function reportedRules(config, file) {
  const [result] = await createLinter(config).lintFiles([file]);
  const rules = new Set();
  for (const message of result.messages) {
    if (message.fatal) {
      assert.fail(message.message);
    }
    if (message.ruleId) {
      rules.add(message.ruleId);
    }
  }
  return rules;
}

export async function assertReports(config, file, expected) {
  const reported = await reportedRules(config, file);
  const missing = expected.filter((id) => !reported.has(id));
  assert.equal(
    missing.length,
    0,
    `rules that did not report on ${path.basename(file)}: ${missing.join(", ")}`,
  );
}

export async function enabledRules(config, file) {
  const computed = await createLinter(config).calculateConfigForFile(file);
  const entries = Object.entries(computed.rules ?? {}).filter(([, value]) => {
    const severity = Array.isArray(value) ? value[0] : value;
    return severity !== 0 && severity !== "off";
  });
  return Object.fromEntries(entries.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}
