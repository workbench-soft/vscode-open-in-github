import { HostLinks, LinkTarget, lineAnchor, mapUrl } from "./host-links";

/**
 * Bitbucket Server and Data Center. The mapping applies to the host alone,
 * and each view opens the same browse page.
 */
export const bitbucketServerLinks: HostLinks = {
  file: browseLink,
  blame: browseLink,
  history: browseLink,
};

/** Fails with a message when the remote isn't `https://host/project/repo`. */
function browseLink({ remote, branch, path, mapping, lines }: LinkTarget) {
  const match = remote.match(/(https:\/\/[^/]+)\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error(`No Bitbucket Server project and repo in ${remote}`);
  }

  const [, host, project, repo] = match;
  const page = `${mapUrl(host, mapping)}/projects/${project}/repos/${repo}`;
  const ref = encodeURIComponent(`refs/heads/${branch}`);
  return `${page}/browse/${path}?at=${ref}${lineAnchor(lines, "#", "-")}`;
}
