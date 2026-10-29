import { exec, execFile } from "child_process";

/** Runs git with `args` in `cwd` and resolves with the trimmed output. */
export type Git = (args: string[], cwd: string) => Promise<string>;

export const runGit: Git = (args, cwd) =>
  new Promise((resolve, reject) => {
    execFile("git", args, { cwd }, (error, stdout) =>
      error ? reject(error) : resolve(stdout.trim())
    );
  });

/** Fails with the git error text whenever git writes to stderr. */
function runGitLine(command: string, cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`git ${command}`, { cwd }, (error, stdout, stderr) =>
      stderr || error ? reject(stderr || error) : resolve(stdout)
    );
  });
}

export async function findRepoRoot(dir: string): Promise<string> {
  return (await runGitLine("rev-parse --show-toplevel", dir)).trim();
}

/** The raw fetch URL of `remote`, as `git config` prints it. */
export function readRemoteUrl(repoRoot: string, remote: string) {
  return runGitLine(`config --get remote.${remote}.url`, repoRoot);
}
