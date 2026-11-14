import * as assert from "assert";
import { KnownError } from "../known-error";
import { findRepoRoot, readFetchUrl, readRemoteUrl, runGit } from "./run-git";

suite("findRepoRoot", () => {
  test("says the file is outside a git repo", async () => {
    const git = () =>
      Promise.reject(
        "fatal: not a git repository (or any of the parent directories): .git"
      );
    await assert.rejects(
      findRepoRoot(git, "/tmp"),
      (err) =>
        err instanceof KnownError &&
        err.text === "This file or folder isn't in a git repo."
    );
  });

  test("keeps git's own text for other failures", async () => {
    const dubious = "fatal: detected dubious ownership in repository at '/r'";
    const git = () => Promise.reject(dubious);
    await assert.rejects(findRepoRoot(git, "/r"), (err) => err === dubious);
  });
});

suite("runGit", () => {
  test("says git is missing when the PATH has no git", async () => {
    const path = process.env.PATH;
    process.env.PATH = "";
    try {
      await assert.rejects(
        runGit(["--version"], process.cwd()),
        (err) =>
          err instanceof KnownError && err.text.startsWith("VS Code can't find")
      );
    } finally {
      process.env.PATH = path;
    }
  });
});

suite("readRemoteUrl", () => {
  test("hands the remote name to git as one argument", async () => {
    const calls: string[][] = [];
    const git = async (args: string[]) => {
      calls.push(args);
      return "git@github.com:a/b.git";
    };
    await readRemoteUrl(git, "/repo", "origin; touch pwned");
    await readFetchUrl(git, "/repo", "origin; touch pwned");
    assert.deepEqual(calls, [
      ["config", "--get-all", "remote.origin; touch pwned.url"],
      ["ls-remote", "--get-url", "--", "origin; touch pwned"],
    ]);
  });

  test("keeps the first of several URLs, the one git fetches", async () => {
    const git = async () =>
      "https://github.com/a/first.git\nhttps://gitlab.com/b/mirror.git";
    assert.equal(
      await readRemoteUrl(git, "/repo", "origin"),
      "https://github.com/a/first.git"
    );
  });

  test("names the setting when the remote is missing", async () => {
    const git = () => Promise.reject(new Error("exit 1"));
    await assert.rejects(
      readRemoteUrl(git, "/repo", "upstream"),
      (err: Error) => err.message.startsWith('No remote "upstream"')
    );
  });
});
