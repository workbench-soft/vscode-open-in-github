import { promises as fs } from "fs";
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

/**
 * Resolves symlinks in `openedPath`. A file deleted on disk, still open in an
 * editor or a diff, keeps its own path, since the remote may still hold it.
 */
/**
 * The nearest folder of `openedPath` that exists on disk, so git can start
 * there for a file whose folder got deleted, such as after a branch switch.
 */
export async function existingFolder(openedPath: string): Promise<string> {
  const isFolder = (dir: string) =>
    fs.stat(dir).then(
      (stat) => stat.isDirectory(),
      () => false
    );
  let dir = openedPath;
  while (!(await isFolder(dir)) && path.dirname(dir) !== dir) {
    dir = path.dirname(dir);
  }
  return dir;
}

export function realPathOf(openedPath: string): Promise<string> {
  return fs.realpath(openedPath).catch(() => openedPath);
}
