import { Shape } from "./types";

async function load(): Promise<number> {
  return 1;
}

export function run(value: string | undefined, shape: Shape): number {
  load();
  let never: number | undefined;
  const length = value!.length;
  let total = 0;
  total = length;
  try {
    JSON.parse("{");
  } catch (error) {
    throw new Error("bad");
  }
  const unusedLocal = shape.sides;
  return total + (never ?? 0);
}

export function empty(): void {}
