import { execFile } from "child_process";
import { KnownError } from "../known-error";

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
          reject(
            new KnownError("git {0} took more than {1} seconds.", [
              args[0],
              String(timeoutMs / 1000),
            ])
          );
        } else if ((error as { code?: unknown } | null)?.code === "ENOENT") {
          reject(
            new KnownError(
              "VS Code can't find git. Install git, or add it to the PATH."
            )
          );
        } else if (error) {
          reject(stderr.trim() || error);
        } else {
          resolve(stdout.trim());
        }
      }
    );
  });

/**
 * The repo root above `dir`. Outside a repo, git's English `fatal:` line
 * gives way to a translated message. Other failures, such as dubious
 * ownership, keep git's text, since it names the fix.
 */
export function findRepoRoot(git: Git, dir: string): Promise<string> {
  return git(["rev-parse", "--show-toplevel"], dir).catch((err) =>
    Promise.reject(
      /not a git repository/.test(String(err))
        ? new KnownError("This file or folder isn't in a git repo.")
        : err
    )
  );
}

/**
 * The URL of `remote` as the repo config stores it. A remote with a second
 * push URL added by `git remote set-url --add` keeps the first, which git
 * fetches from.
 */
export function readRemoteUrl(git: Git, repoRoot: string, remote: string) {
  return git(["config", "--get-all", `remote.${remote}.url`], repoRoot).then(
    (urls) => urls.split(/\r?\n/)[0],
    () =>
      Promise.reject(
        new KnownError(
          'No remote "{0}" in this repo. Set openInGitHub.defaultRemote to a name from git remote.',
          [remote]
        )
      )
  );
}

/**
 * The URL git fetches `remote` from, with `url.<base>.insteadOf` aliases
 * applied. ls-remote works on git older than 2.7 and makes no network call.
 */
export function readFetchUrl(git: Git, repoRoot: string, remote: string) {
  return git(["ls-remote", "--get-url", "--", remote], repoRoot);
}
