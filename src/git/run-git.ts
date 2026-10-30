import { execFile } from "child_process";

/** Runs git with `args` in `cwd` and resolves with the trimmed output. */
export type Git = (args: string[], cwd: string) => Promise<string>;

const timeoutMs = 10_000;

/**
 * Passes each argument straight to git, with no shell, so a setting such as
 * the remote name can't run a command. A failure rejects with git's message.
 * git stops after 10 seconds, and asks for no password in a terminal.
 */
export const runGit: Git = (args, cwd) =>
  new Promise((resolve, reject) => {
    const env = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
    execFile(
      "git",
      args,
      { cwd, env, timeout: timeoutMs },
      (error, stdout, stderr) => {
        if (error?.killed) {
          reject(`git ${args[0]} took more than ${timeoutMs / 1000} seconds.`);
        } else if (error) {
          reject(stderr.trim() || error);
        } else {
          resolve(stdout.trim());
        }
      }
    );
  });

export function findRepoRoot(git: Git, dir: string): Promise<string> {
  return git(["rev-parse", "--show-toplevel"], dir);
}

/** The fetch URL of `remote`, with `url.<base>.insteadOf` aliases applied. */
export function readRemoteUrl(git: Git, repoRoot: string, remote: string) {
  return git(["remote", "get-url", "--", remote], repoRoot);
}
