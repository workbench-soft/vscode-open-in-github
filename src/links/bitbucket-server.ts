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

/**
 * Reads `https://host[/context][/scm]/project/repo`, the https clone URL or
 * the web form of an SSH remote. Fails with a message for any other shape.
 */
function browseLink({ remote, branch, path, mapping, lines }: LinkTarget) {
  const match = remote.match(
    /^(https?:\/\/[^/]+(?:\/.*?)??)(?:\/scm)?\/([^/]+)\/([^/]+)$/
  );
  if (!match) {
    throw new Error(`No Bitbucket Server project and repo in ${remote}`);
  }

  const [, base, project, repo] = match;
  const page = `${mapUrl(base, mapping)}/projects/${project}/repos/${repo}`;
  // A detached HEAD gives a commit, which Bitbucket takes as it is.
  const ref = /^[0-9a-f]{40}$/.test(branch) ? branch : `refs/heads/${branch}`;
  const at = encodeURIComponent(ref);
  return `${page}/browse/${path}?at=${at}${lineAnchor(lines, "#", "-")}`;
}
