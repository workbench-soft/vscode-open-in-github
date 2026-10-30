import { encodePath, HostLinks, lineAnchor, mapUrl } from "./host-links";

/** Files GitHub renders, such as `README.MD` or `guide.adoc`. */
const rendered =
  /\.(md|markdown|mdown|mkdn|mdx|rst|adoc|asciidoc|org|textile|rdoc)$/i;

/** GitHub and GitHub Enterprise. */
export const githubLinks: HostLinks = {
  file: ({ remote, branch, path, mapping, lines }) => {
    // A rendered page has no line numbers.
    const plain = lines?.start && rendered.test(path) ? "?plain=1" : "";
    const anchor = lineAnchor(lines, "#L", "-L");
    return `${mapUrl(remote, mapping)}/blob/${encodePath(branch)}/${encodePath(
      path
    )}${plain}${anchor}`;
  },
  blame: ({ remote, branch, path, mapping, lines }) =>
    `${mapUrl(remote, mapping)}/blame/${encodePath(branch)}/${encodePath(
      path
    )}${lineAnchor(lines, "#L", "-L")}`,
  history: ({ remote, branch, path, mapping }) =>
    `${mapUrl(remote, mapping)}/commits/${encodePath(branch)}/${encodePath(
      path
    )}`,
};
