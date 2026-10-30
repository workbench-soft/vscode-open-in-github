import * as assert from "assert";
import { readRemoteUrl } from "./run-git";

suite("readRemoteUrl", () => {
  test("hands the remote name to git as one argument", async () => {
    const calls: string[][] = [];
    const git = async (args: string[]) => {
      calls.push(args);
      return "git@github.com:a/b.git";
    };
    await readRemoteUrl(git, "/repo", "origin; touch pwned");
    assert.deepEqual(calls, [
      ["remote", "get-url", "--", "origin; touch pwned"],
    ]);
  });
});
