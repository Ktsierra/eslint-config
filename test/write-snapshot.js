import { writeFile } from "node:fs/promises";
import { ruleSnapshot, snapshotPath } from "./snapshot.js";

await writeFile(snapshotPath, `${JSON.stringify(await ruleSnapshot(), null, 2)}\n`);
