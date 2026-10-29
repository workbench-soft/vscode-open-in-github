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
});
