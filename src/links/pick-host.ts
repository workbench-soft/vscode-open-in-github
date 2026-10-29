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
export function pickHost(repositoryType: string, remote: string): HostLinks {
  const named = linksByType.get(repositoryType);
  if (named) return named;
  if (/bitbucket.org/.test(remote)) return bitbucketLinks;
  if (/gitlab.com/.test(remote)) return gitlabLinks;
  return githubLinks;
}
