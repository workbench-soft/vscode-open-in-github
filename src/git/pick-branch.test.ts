import * as assert from "assert";
import { pickBranch } from "./pick-branch";
import { Git } from "./run-git";

/** A git whose remote holds `paths`, each written as `origin/branch:path`. */
function fakeGit(paths: string[], remoteHead = "", current = "feature/x"): Git {
  return ([command, ...rest]) => {
    if (command === "symbolic-ref") {
      return remoteHead
        ? Promise.resolve(`origin/${remoteHead}`)
        : Promise.reject(new Error("no HEAD"));
    }
    if (command === "cat-file") {
      return paths.includes(rest[1])
        ? Promise.resolve("")
        : Promise.reject(new Error("missing"));
    }
    return Promise.resolve(rest[0] === "--abbrev-ref" ? current : "abc123");
  };
}

const pick = (git: Git, configured = "") =>
  pickBranch(git, "", "origin", "a.ts", configured);

suite("pickBranch", () => {
  test("prefers main when it holds the file", async () => {
    assert.equal(
      await pick(fakeGit(["origin/main:a.ts", "origin/master:a.ts"])),
      "main"
    );
  });

  test("takes master when main is missing", async () => {
    assert.equal(await pick(fakeGit(["origin/master:a.ts"])), "master");
  });

  test("puts the remote HEAD and the configured branch first", async () => {
    assert.equal(
      await pick(fakeGit(["origin/main:a.ts", "origin/dev:a.ts"], "dev")),
      "dev"
    );
    assert.equal(
      await pick(fakeGit(["origin/main:a.ts", "origin/next:a.ts"]), "next"),
      "next"
    );
  });

  test("falls back to the current branch", async () => {
    assert.equal(await pick(fakeGit(["origin/main:b.ts"])), "feature/x");
  });

  test("falls back to the commit sha on a detached HEAD", async () => {
    assert.equal(await pick(fakeGit([], "", "HEAD")), "abc123");
  });
});
