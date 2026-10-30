import { bitbucketLinks } from "./bitbucket";
import { bitbucketServerLinks } from "./bitbucket-server";
import { githubLinks } from "./github";
import { gitlabLinks } from "./gitlab";
import { HostLinks } from "./host-links";

/** Values of the `openInGitHub.repositoryType` setting. */
const linksByType = new Map<string, HostLinks>([
  ["github", githubLinks],
  ["bitbucket", bitbucketLinks],
  ["bitbucket-server", bitbucketServerLinks],
  ["gitlab", gitlabLinks],
]);

/**
 * A named type wins. `auto`, an empty value and an unknown type read the host
 * from the remote URL, and an unknown host counts as GitHub.
 */
export function pickHost(
  repositoryType: string | undefined,
  remote: string
): HostLinks {
  const named = repositoryType && linksByType.get(repositoryType);
  if (named) return named;
  // Only the host counts, so a repo named `gitlab-com-sync` stays on GitHub.
  const host = hostOf(remote);
  if (/bitbucket.org/.test(host)) return bitbucketLinks;
  if (/gitlab.com/.test(host)) return gitlabLinks;
  return githubLinks;
}

function hostOf(remote: string): string {
  try {
    return new URL(remote).hostname;
  } catch {
    return "";
  }
}
