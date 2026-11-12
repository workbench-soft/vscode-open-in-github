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
  // Full ref names, since git shortens a name a tag or branch shares to
  // `heads/v1` or `remotes/origin/main`.
  const remoteHead = await git(
    ["symbolic-ref", "-q", `refs/remotes/${remote}/HEAD`],
    repoRoot
  ).then(
    (ref) => stripPrefix(ref, `refs/remotes/${remote}/`),
    () => ""
  );

  const candidates = [
    ...new Set([configuredBranch, remoteHead, "main", "master"]),
  ].filter(Boolean);
  // rev-parse reads trees only. cat-file fetched the file in a partial clone,
  // and hung offline.
  const hasPath = await Promise.all(
    candidates.map((branch) =>
      git(
        ["rev-parse", "--verify", "--quiet", `${remote}/${branch}:${path}`],
        repoRoot
      ).then(
        () => true,
        () => false
      )
    )
  );
  const mainBranch = candidates.find((_, i) => hasPath[i]);
  if (mainBranch) return mainBranch;

  // A detached HEAD fails here and gives the commit sha.
  return git(["symbolic-ref", "-q", "HEAD"], repoRoot).then(
    (ref) => stripPrefix(ref, "refs/heads/"),
    () => git(["rev-parse", "HEAD"], repoRoot)
  );
}

function stripPrefix(ref: string, prefix: string): string {
  return ref.startsWith(prefix) ? ref.slice(prefix.length) : "";
}
