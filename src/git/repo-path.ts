import * as path from "path";

/**
 * Gives the path from the repo root with forward slashes. A symlink resolves
 * to its target, so the path exists on the remote, unless the target sits
 * outside the repo or on another Windows drive.
 */
export function toRepoPath(
  repoRoot: string,
  realPath: string,
  openedPath: string
): string {
  const fromTarget = path.relative(repoRoot, realPath);
  const outside = fromTarget.startsWith("..") || path.isAbsolute(fromTarget);
  const relative = outside ? path.relative(repoRoot, openedPath) : fromTarget;
  return relative.split(path.sep).join("/");
}
