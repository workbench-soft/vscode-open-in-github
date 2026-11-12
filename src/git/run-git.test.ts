import * as assert from "assert";
import { readFetchUrl, readRemoteUrl } from "./run-git";

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
      (err) => typeof err === "string" && err.startsWith('No remote "upstream"')
    );
  });
});
