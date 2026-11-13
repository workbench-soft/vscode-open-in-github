import { HostLinks, lineAnchor, pageLink } from "./host-links";

/** Files GitHub renders, such as `README.MD` or `guide.adoc`. */
const rendered =
  /\.(md|markdown|mdown|mkdn|mdx|rst|adoc|asciidoc|org|textile|rdoc)$/i;

/** GitHub and GitHub Enterprise. */
export const githubLinks: HostLinks = {
  file: (target) => {
    // A rendered page has no line numbers.
    const { path, lines } = target;
    const plain = lines?.start && rendered.test(path) ? "?plain=1" : "";
    return `${pageLink("blob")(target)}${plain}${lineAnchor(lines, "#L", "-L")}`;
  },
  blame: pageLink("blame", "-L"),
  history: pageLink("commits"),
};
