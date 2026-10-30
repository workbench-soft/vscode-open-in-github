import { posix } from "path";
import {
  encodePath,
  HostLinks,
  LinkTarget,
  lineAnchor,
  mapUrl,
} from "./host-links";

/** Bitbucket Cloud anchors lines by file name, as in `#app.ts-10:20`. */
export const bitbucketLinks: HostLinks = {
  file: (target) => linkTo("src", target, true),
  blame: (target) => linkTo("annotate", target, true),
  history: (target) => linkTo("history-node", target, false),
};

function linkTo(
  page: string,
  { remote, branch, path, mapping, lines }: LinkTarget,
  withLines: boolean
): string {
  const anchor = withLines
    ? lineAnchor(lines, `#${posix.basename(path)}-`, ":")
    : "";
  const where = `${encodePath(branch)}/${encodePath(path)}`;
  return `${mapUrl(remote, mapping)}/${page}/${where}${anchor}`;
}
