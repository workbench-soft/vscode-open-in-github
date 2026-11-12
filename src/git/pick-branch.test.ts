import * as assert from "assert";
import { pickBranch } from "./pick-branch";
import { Git } from "./run-git";

/**
 * A git whose remote holds `paths`, each written as `origin/branch:path`.
 * With `ambiguous`, a tag shares each branch name, so git shortens refs to
 * `heads/x` and `remotes/origin/x`.
 */
function fakeGit(
  paths: string[],
  remoteHead = "",
  current = "feature/x",
  ambiguous = false
): Git {
  return ([command, ...rest]) => {
    const short = rest.includes("--short") || rest.includes("--abbrev-ref");
    const name = (ref: string, prefix: string, shortPrefix: string) =>
      short ? (ambiguous ? shortPrefix : "") + ref : prefix + ref;
    if (command === "symbolic-ref" && rest.includes("HEAD")) {
      return current === "HEAD"
        ? Promise.reject(new Error("not a symbolic ref"))
        : Promise.resolve(name(current, "refs/heads/", "heads/"));
    }
    if (command === "symbolic-ref") {
      return remoteHead
        ? Promise.resolve(
            name(`origin/${remoteHead}`, "refs/remotes/", "remotes/")
          )
        : Promise.reject(new Error("no HEAD"));
    }
    if (command === "rev-parse" && rest[0] === "--verify") {
      return paths.includes(rest[2])
        ? Promise.resolve("")
        : Promise.reject(new Error("missing"));
    }
    if (rest[0] === "--abbrev-ref") {
      return Promise.resolve(
        current === "HEAD" ? "HEAD" : name(current, "", "heads/")
      );
    }
    return Promise.resolve("abc123");
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

  test("reads a remote HEAD whose name a local branch shares", async () => {
    assert.equal(
      await pick(fakeGit(["origin/trunk:a.ts"], "trunk", "feature/x", true)),
      "trunk"
    );
  });

  test("keeps the current branch whose name a tag shares", async () => {
    assert.equal(
      await pick(fakeGit(["origin/main:b.ts"], "", "v1", true)),
      "v1"
    );
  });
});
