/**
 * Turns `git remote` URLs into web URLs: SSH, git and FTP forms become
 * https, and the `.git` suffix and trailing slash go. A URL with no web
 * form, such as a local path, is dropped.
 */
export function toWebUrls(remoteUrls: string[]): string[] {
  const urls = remoteUrls
    .map(toWebForm)
    .filter((url): url is string => url != null)
    .map((url) => (/github\.com/.test(url) ? stripGitSuffix(url) : url))
    .map((url) => url.replace(/\/\/(.+)@github/, "//github").trim())
    .map((url) => url.replace(/\n/, ""))
    .filter((url) => url !== "")
    .map((url) => url.replace(/\/$/, ""));
  return [...new Set(urls)];
}

function stripGitSuffix(url: string): string {
  return url.replace(/\.git(\b|$)/, "");
}

function toWebForm(url: string): string | undefined {
  if (/^https?:/.test(url)) return stripGitSuffix(url);
  if (/@/.test(url)) {
    // `user@host:owner/repo.git`, with an optional port after the host.
    const hostAndPath = stripGitSuffix(url.replace(/^.+@/, ""))
      .replace(/:\d{1,4}/, "")
      .replace(/:/g, "/");
    return `https://${hostAndPath}`;
  }
  if (/^ftps?:/.test(url)) return url.replace(/^ftp/, "http");
  if (/^ssh:/.test(url)) return url.replace(/^ssh/, "https");
  if (/^git:/.test(url)) return url.replace(/^git/, "https");
  return undefined;
}
