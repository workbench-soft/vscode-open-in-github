import { HostLinks, pageLink } from "./host-links";

/** GitLab writes a line range as `#L10-20`. History takes the GitHub path. */
export const gitlabLinks: HostLinks = {
  file: pageLink("blob", "-"),
  blame: pageLink("blame", "-"),
  history: pageLink("commits"),
};
