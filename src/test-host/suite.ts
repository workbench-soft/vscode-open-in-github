import * as glob from "glob";
import * as Mocha from "mocha";
import * as path from "path";

/** Entry point VS Code calls inside the test window: runs every compiled test. */
export async function run(): Promise<void> {
  const mocha = new Mocha({ ui: "tdd", color: true });
  const compiledSrc = path.resolve(__dirname, "..");
  for (const file of glob.sync("**/**.test.js", { cwd: compiledSrc })) {
    mocha.addFile(path.resolve(compiledSrc, file));
  }
  return new Promise((resolve, reject) => {
    mocha.run((failures) =>
      failures > 0 ? reject(new Error(`${failures} tests failed.`)) : resolve()
    );
  });
}
