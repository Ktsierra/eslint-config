import path from "node:path";
import baseConfig from "../index.js";
import reactConfig from "../react.js";
import reactNativeConfig from "../react-native.js";
import { enabledRules, fixture, repoRoot } from "./helpers.js";

export const snapshotPath = path.join(repoRoot, "test", "rules.snapshot.json");

export async function ruleSnapshot() {
  return {
    "base:sample.ts": await enabledRules(
      baseConfig(fixture("base", "tsconfig.json")),
      fixture("base", "sample.ts"),
    ),
    "base:plain.js": await enabledRules(
      baseConfig(fixture("base", "tsconfig.json")),
      fixture("base", "plain.js"),
    ),
    "react:Sample.tsx": await enabledRules(
      reactConfig(fixture("react", "tsconfig.json")),
      fixture("react", "Sample.tsx"),
    ),
    "react:Plain.jsx": await enabledRules(
      reactConfig(fixture("react", "tsconfig.json")),
      fixture("react", "Plain.jsx"),
    ),
    "react-native:Sample.tsx": await enabledRules(
      reactNativeConfig(fixture("react-native", "tsconfig.json")),
      fixture("react-native", "Sample.tsx"),
    ),
  };
}
