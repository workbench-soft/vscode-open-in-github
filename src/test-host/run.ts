import { runTests } from "@vscode/test-electron";
import * as path from "path";

// Downloads VS Code, then opens it with this extension and the test suite.
// The script compiles to out/src/test-host, three levels below package.json.
runTests({
  extensionDevelopmentPath: path.resolve(__dirname, "../../../"),
  extensionTestsPath: path.resolve(__dirname, "./suite"),
}).catch((err) => {
  console.error(err);
  console.error("Failed to run tests");
  process.exit(1);
});
