import { promises as fs } from "fs";
import * as path from "path";

/**
 * Gives the path from the repo root with forward slashes, from the first of
 * `paths` that sits inside the repo. Callers pass the symlink target first,
 * so the path exists on the remote, unless the target sits outside the repo
 * or on another Windows drive.
 */
export function toRepoPath(repoRoot: string, ...paths: string[]): string {
  const relatives = paths.map((p) => path.relative(repoRoot, p));
  const inside = relatives.find(
    (r) => !r.startsWith("..") && !path.isAbsolute(r)
  );
  return (inside ?? relatives[relatives.length - 1]).split(path.sep).join("/");
}

/**
 * The nearest folder of `openedPath` that exists on disk, so git can start
 * there for a file whose folder got deleted, such as after a branch switch.
 * It climbs no higher than `top`, so a deleted repo inside another repo
 * doesn't give a link into the outer one. Undefined when none is left.
 */
export async function existingFolder(
  openedPath: string,
  top?: string
): Promise<string | undefined> {
  const isFolder = (dir: string) =>
    fs.stat(dir).then(
      (stat) => stat.isDirectory(),
      () => false
    );
  const above = (dir: string) => {
    const rest = top === undefined ? "" : path.relative(top, dir);
    return rest.startsWith("..") || path.isAbsolute(rest);
  };
  for (let dir = openedPath; !above(dir); dir = path.dirname(dir)) {
    if (await isFolder(dir)) return dir;
    if (path.dirname(dir) === dir) return undefined;
  }
  return undefined;
}

/**
 * `openedPath` with symlinks resolved in the folders above it, the file
 * itself kept. git gives the repo root with symlinks resolved, as for a
 * workspace opened through a junction, macOS `/tmp` or a symlinked home.
 */
export async function linkPathOf(openedPath: string): Promise<string> {
  const parent = path.dirname(openedPath);
  const folder = (await existingFolder(parent)) ?? parent;
  const real = await fs.realpath(folder).catch(() => folder);
  return path.join(real, path.relative(folder, openedPath));
}

/**
 * Resolves symlinks in `openedPath`. A file deleted on disk, still open in an
 * editor or a diff, takes `fallback`, since the remote may still hold it.
 */
export function realPathOf(
  openedPath: string,
  fallback = openedPath
): Promise<string> {
  return fs.realpath(openedPath).catch(() => fallback);
}
