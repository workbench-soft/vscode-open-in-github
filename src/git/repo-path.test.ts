import * as assert from "assert";
import { toRepoPath } from "./repo-path";

suite("toRepoPath", () => {
  test("follows a symlink whose target is in the repo", () => {
    assert.equal(
      toRepoPath(
        "/repo",
        "/repo/.agents/skills/a/SKILL.md",
        "/repo/.claude/skills/a/SKILL.md"
      ),
      ".agents/skills/a/SKILL.md"
    );
  });

  test("keeps the link path when the target is outside the repo", () => {
    assert.equal(
      toRepoPath("/repo", "/elsewhere/a.md", "/repo/docs/a.md"),
      "docs/a.md"
    );
  });

  // path.relative gives an absolute path across drives on Windows alone.
  (process.platform === "win32" ? test : test.skip)(
    "keeps the opened path when the target is on another drive",
    () => {
      assert.equal(
        toRepoPath("S:/repo", "C:/real/repo/src/a.ts", "S:/repo/src/a.ts"),
        "src/a.ts"
      );
    }
  );
});
