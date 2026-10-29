import { Git } from "./run-git";

/**
 * Picks the branch to link to. The first of these that holds `path` on the
 * remote wins: the configured branch, the remote HEAD, `main`, `master`.
 * Otherwise the current branch, or the commit sha on a detached HEAD.
 */
export async function pickBranch(
  git: Git,
  repoRoot: string,
  remote: string,
  path: string,
  configuredBranch: string
): Promise<string> {
  const remoteHead = await git(
    ["symbolic-ref", "--short", `refs/remotes/${remote}/HEAD`],
    repoRoot
  ).then(
    (ref) => ref.slice(remote.length + 1),
    () => ""
  );

  const candidates = [
    ...new Set([configuredBranch, remoteHead, "main", "master"]),
  ].filter(Boolean);
  const hasPath = await Promise.all(
    candidates.map((branch) =>
      git(["cat-file", "-e", `${remote}/${branch}:${path}`], repoRoot).then(
        () => true,
        () => false
      )
    )
  );
  const mainBranch = candidates.find((_, i) => hasPath[i]);
  if (mainBranch) return mainBranch;

  const current = await git(["rev-parse", "--abbrev-ref", "HEAD"], repoRoot);
  return current === "HEAD" ? git(["rev-parse", "HEAD"], repoRoot) : current;
}
