/** Lines are 1-based. `end` is left out or equal to `start` for one line. */
export interface SelectedLines {
  start: number;
  end?: number;
}

/** Keys are web URLs from the git remote, values the URLs to link to instead. */
export type UrlMapping = Record<string, string>;

export type LinkView = "file" | "blame" | "history";

export interface LinkTarget {
  /** The remote as a web URL, such as `https://github.com/owner/repo`. */
  remote: string;
  branch: string;
  /** Path from the repo root, with forward slashes. */
  path: string;
  mapping?: UrlMapping;
  lines?: SelectedLines;
}

export type HostLinks = Record<LinkView, (target: LinkTarget) => string>;

export function mapUrl(url: string, mapping: UrlMapping = {}): string {
  return url in mapping ? mapping[url] : url;
}

/**
 * Escapes each part of a branch or a file path, so `#`, `?`, `%` and spaces
 * stay inside the URL path.
 */
export function encodePath(slashPath: string): string {
  return slashPath.split("/").map(encodeURIComponent).join("/");
}

/**
 * Writes the anchor for the selected lines: `prefix` and the first line, then
 * `separator` and the last line when the selection spans more than one.
 */
export function lineAnchor(
  lines: SelectedLines | undefined,
  prefix: string,
  separator: string
): string {
  if (!lines?.start) return "";
  const { start, end } = lines;
  return end && end !== start
    ? `${prefix}${start}${separator}${end}`
    : `${prefix}${start}`;
}
