import { bitbucketLinks } from "./bitbucket";
import { bitbucketServerLinks } from "./bitbucket-server";
import { githubLinks } from "./github";
import { gitlabLinks } from "./gitlab";
import { HostLinks } from "./host-links";

/** Values of the `openInGitHub.repositoryType` setting. */
const linksByType: Record<string, HostLinks> = {
  github: githubLinks,
  bitbucket: bitbucketLinks,
  "bitbucket-server": bitbucketServerLinks,
  gitlab: gitlabLinks,
};

/** `auto` reads the host from the remote URL and treats unknown hosts as GitHub. */
export function pickHost(repositoryType: string, remote: string): HostLinks {
  if (repositoryType !== "auto") return linksByType[repositoryType];
  if (/bitbucket.org/.test(remote)) return bitbucketLinks;
  if (/gitlab.com/.test(remote)) return gitlabLinks;
  return githubLinks;
}
