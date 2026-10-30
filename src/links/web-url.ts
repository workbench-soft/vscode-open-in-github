/**
 * Turns `git remote` URLs into web URLs: SSH, git and FTP forms become
 * https, and the `.git` suffix, the trailing slash and any user name or
 * token go. A URL with no web form, such as a local path, is dropped.
 */
export function toWebUrls(remoteUrls: string[]): string[] {
  const urls = remoteUrls
    .map((url) => toWebForm(url.trim()))
    .filter((url): url is string => url != null)
    .map((url) => (/github\.com/.test(url) ? stripGitSuffix(url) : url))
    // A user name or token in the remote stays out of the link.
    .map((url) => url.replace(/^(https?:\/\/)[^/]*@/, "$1").trim())
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
  // `ssh://[user@]host[:port]/owner/repo.git`
  const ssh = url.match(/^ssh:\/\/(?:[^@/]*@)?([^:/]+)(?::\d+)?\/(.+)$/);
  if (ssh) return `https://${ssh[1]}/${stripGitSuffix(ssh[2])}`;
  // `user@host:owner/repo.git`. The path after the colon may start with a
  // digit, as in `1Password/sdk`, so no port is read there.
  const scp = url.match(/^[^@/]+@([^:/]+):\/?(.+)$/);
  if (scp) return `https://${scp[1]}/${stripGitSuffix(scp[2])}`;
  if (/^ftps?:/.test(url)) return url.replace(/^ftp/, "http");
  if (/^git:/.test(url)) return url.replace(/^git/, "https");
  return undefined;
}
