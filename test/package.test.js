import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { repoRoot } from "./helpers.js";

const manifest = JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));

test("every exported file exists and is published", () => {
  for (const target of Object.values(manifest.exports)) {
    for (const file of [target.import, target.types]) {
      const name = file.replace(/^\.\//, "");
      assert.ok(existsSync(path.join(repoRoot, name)), `${name} does not exist`);
      assert.ok(manifest.files.includes(name), `${name} is not in "files"`);
    }
  }
});

test("every published file exists, and the changelog and README ship", () => {
  for (const name of manifest.files) {
    assert.ok(existsSync(path.join(repoRoot, name)), `${name} is in "files" but does not exist`);
  }
  assert.ok(manifest.files.includes("CHANGELOG.md"));
  assert.ok(manifest.files.includes("README.md"));
});
