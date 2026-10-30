import { Git, readFetchUrl, readRemoteUrl } from "../git/run-git";
import { toWebUrl } from "../links/web-url";

/**
 * Reads the web URL of `remote`. The stored URL wins, so an insteadOf mirror
 * or cache stays out of the link. An alias such as `gh:owner/repo` has no
 * web form, so git expands it.
 */
export async function readWebRemote(
  git: Git,
  repoRoot: string,
  remote: string
): Promise<{ stored: string; web?: string }> {
  const stored = await readRemoteUrl(git, repoRoot, remote);
  const web =
    toWebUrl(stored) ?? toWebUrl(await readFetchUrl(git, repoRoot, remote));
  return { stored, web };
}
