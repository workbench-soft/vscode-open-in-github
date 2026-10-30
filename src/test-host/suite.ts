import * as fs from "fs";
import * as Mocha from "mocha";
import * as path from "path";

/** Entry point VS Code calls inside the test window: runs every compiled test. */
export async function run(): Promise<void> {
  const mocha = new Mocha({ ui: "tdd", color: true });
  for (const file of testFiles(path.resolve(__dirname, ".."))) {
    mocha.addFile(file);
  }
  return new Promise((resolve, reject) => {
    mocha.run((failures) =>
      failures > 0 ? reject(new Error(`${failures} tests failed.`)) : resolve()
    );
  });
}

/** Every `*.test.js` under `dir`, in its subfolders too. */
function testFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return testFiles(full);
    return entry.name.endsWith(".test.js") ? [full] : [];
  });
}
