import * as assert from "assert";
import { promises as fs } from "fs";
import * as os from "os";
import * as path from "path";
import {
  existingFolder,
  linkPathOf,
  realPathOf,
  toRepoPath,
} from "./repo-path";

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

suite("existingFolder", () => {
  test("climbs out of a folder deleted on disk", async () => {
    const gone = path.join(__dirname, "deleted-folder", "inner");
    assert.equal(await existingFolder(gone), __dirname);
  });

  test("keeps a folder that exists", async () => {
    assert.equal(await existingFolder(__dirname), __dirname);
  });
});

suite("realPathOf", () => {
  test("keeps the path of a file deleted on disk", async () => {
    const gone = path.join(__dirname, "deleted-file.ts");
    assert.equal(await realPathOf(gone), gone);
  });
});

suite("linkPathOf", () => {
  test("keeps a deleted file inside a repo opened through a link", async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "repo-path-"));
    const repo = path.join(tmp, "repo");
    const link = path.join(tmp, "link");
    await fs.mkdir(repo);
    await fs.symlink(repo, link, "junction");
    try {
      // git gives the root with links resolved.
      const root = await fs.realpath(repo);
      const opened = path.join(link, "src", "deleted.ts");
      const linkPath = await linkPathOf(opened);
      const real = await realPathOf(opened, linkPath);
      assert.equal(toRepoPath(root, real, linkPath, opened), "src/deleted.ts");
    } finally {
      await fs.rm(tmp, { recursive: true, force: true });
    }
  });
});
