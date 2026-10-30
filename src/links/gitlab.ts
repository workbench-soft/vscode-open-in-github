import { encodePath, HostLinks, lineAnchor, mapUrl } from "./host-links";
import { githubLinks } from "./github";

/** GitLab writes a line range as `#L10-20`. History takes the GitHub path. */
export const gitlabLinks: HostLinks = {
  file: ({ remote, branch, path, mapping, lines }) =>
    `${mapUrl(remote, mapping)}/blob/${encodePath(branch)}/${encodePath(
      path
    )}${lineAnchor(lines, "#L", "-")}`,
  blame: ({ remote, branch, path, mapping, lines }) =>
    `${mapUrl(remote, mapping)}/blame/${encodePath(branch)}/${encodePath(
      path
    )}${lineAnchor(lines, "#L", "-")}`,
  history: githubLinks.history,
};
