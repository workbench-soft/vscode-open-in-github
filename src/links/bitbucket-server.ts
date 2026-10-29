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

function browseLink({ remote, branch, path, mapping, lines }: LinkTarget) {
  const [, host, project, repo] = remote.match(
    /(https:\/\/[^/]+)\/([^/]+)\/([^/]+)/
  );
  const ref = encodeURIComponent(`refs/heads/${branch}`);
  return `${mapUrl(
    host,
    mapping
  )}/projects/${project}/repos/${repo}/browse/${path}?at=${ref}${lineAnchor(
    lines,
    "#",
    "-"
  )}`;
}
