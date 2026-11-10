import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { ruleSnapshot, snapshotPath } from "./snapshot.js";

test("enabled rules match the committed snapshot", async () => {
  const committed = JSON.parse(await readFile(snapshotPath, "utf8"));
  assert.deepEqual(
    await ruleSnapshot(),
    committed,
    "The enabled rules changed. If that is intended, run `pnpm test:update` and record the change in CHANGELOG.md.",
  );
});
