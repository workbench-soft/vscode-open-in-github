import * as assert from "assert";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

// The compiled test runs from out/src, so the repo root sits two levels up.
const root = join(__dirname, "..", "..");
const read = (file: string) => readFileSync(join(root, file), "utf8");
const keysOf = (file: string) => Object.keys(JSON.parse(read(file))).sort();
const unique = (items: string[]) => [...new Set(items)].sort();

/** Every `src/**` source file, tests left out. */
function sources(dir = "src"): string[] {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((e) => {
    const file = `${dir}/${e.name}`;
    if (e.isDirectory()) return sources(file);
    return /(?<!\.test)\.ts$/.test(e.name) ? [file] : [];
  });
}

/** The message of each `l10n.t("...")` call, as the bundles key it. */
const messages = unique(
  sources().flatMap((file) =>
    [...read(file).matchAll(/l10n\.t\(\s*(["'])((?:\\.|(?!\1).)*)\1/g)].map(
      ([, quote, text]) =>
        quote === '"' ? JSON.parse(`"${text}"`) : text.replace(/\\'/g, "'")
    )
  )
);

suite("translations", () => {
  const english = keysOf("package.nls.json");
  test("package.nls.json names each %key% of package.json", () => {
    assert.deepEqual(
      unique(read("package.json").match(/(?<="%)\w+(?=%")/g) ?? []),
      english
    );
  });

  for (const file of readdirSync(root).filter((name) =>
    /^package\.nls\..+\.json$/.test(name)
  )) {
    test(`${file} names each command and setting`, () => {
      assert.deepEqual(keysOf(file), english);
    });
  }

  for (const bundle of readdirSync(join(root, "l10n"))) {
    test(`${bundle} translates each l10n.t message in src`, () => {
      assert.deepEqual(keysOf(`l10n/${bundle}`), messages);
    });
  }
});
