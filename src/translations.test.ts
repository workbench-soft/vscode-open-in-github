import * as assert from "assert";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

// The compiled test runs from out/src, so the repo root sits two levels up.
const root = join(__dirname, "..", "..");
const keysOf = (file: string) =>
  Object.keys(JSON.parse(readFileSync(join(root, file), "utf8"))).sort();

suite("translations", () => {
  const english = keysOf("package.nls.json");
  for (const file of readdirSync(root).filter((name) =>
    /^package\.nls\..+\.json$/.test(name)
  )) {
    test(`${file} names each command and setting`, () => {
      assert.deepEqual(keysOf(file), english);
    });
  }

  const bundles = readdirSync(join(root, "l10n")).map((name) => `l10n/${name}`);
  test("each message bundle holds the same messages", () => {
    const first = keysOf(bundles[0]);
    for (const bundle of bundles)
      assert.deepEqual(keysOf(bundle), first, bundle);
  });
});
