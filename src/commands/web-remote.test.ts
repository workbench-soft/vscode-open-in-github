import * as assert from "assert";
import { Git } from "../git/run-git";
import { readWebRemote } from "./web-remote";

/** A git whose config stores `stored`, and whose insteadOf gives `fetched`. */
function fakeGit(stored: string, fetched: string): Git {
  return async ([command]) => (command === "config" ? stored : fetched);
}

suite("readWebRemote", () => {
  test("keeps the stored URL over an insteadOf mirror", async () => {
    const git = fakeGit(
      "https://github.com/a/b.git",
      "https://gitcache.corp/github.com/a/b.git"
    );
    assert.equal(
      (await readWebRemote(git, "/repo", "origin")).web,
      "https://github.com/a/b"
    );
  });

  test("expands an alias with no web form", async () => {
    const git = fakeGit("gh:a/b", "git@github.com:a/b.git");
    assert.deepEqual(await readWebRemote(git, "/repo", "origin"), {
      stored: "gh:a/b",
      web: "https://github.com/a/b",
    });
  });

  test("gives no web URL for a local path", async () => {
    const git = fakeGit("../other", "../other");
    assert.equal((await readWebRemote(git, "/repo", "origin")).web, undefined);
  });
});
