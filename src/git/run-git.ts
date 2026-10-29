import { execFile } from "child_process";

/** Runs git with `args` in `cwd` and resolves with the trimmed output. */
export type Git = (args: string[], cwd: string) => Promise<string>;

/**
 * Passes each argument straight to git, with no shell, so a setting such as
 * the remote name can't run a command. A failure rejects with git's message.
 */
export const runGit: Git = (args, cwd) =>
  new Promise((resolve, reject) => {
    execFile("git", args, { cwd }, (error, stdout, stderr) =>
      error ? reject(stderr.trim() || error) : resolve(stdout.trim())
    );
  });

export function findRepoRoot(git: Git, dir: string): Promise<string> {
  return git(["rev-parse", "--show-toplevel"], dir);
}

/** The fetch URL of `remote`, as `git config` prints it. */
export function readRemoteUrl(git: Git, repoRoot: string, remote: string) {
  return git(["config", "--get", `remote.${remote}.url`], repoRoot);
}
