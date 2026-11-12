/**
 * Turns a `git remote` URL into a web URL: SSH, git and FTP forms become
 * https, and the `.git` suffix, the trailing slash and any user name or
 * token go. A URL with no web form, such as a local path, gives undefined.
 */
export function toWebUrl(remoteUrl: string): string | undefined {
  const url = toWebForm(remoteUrl.trim());
  if (!url) return undefined;
  return hideCredentials(
    /github\.com/.test(url) ? stripGitSuffix(url) : url
  ).replace(/\/$/, "");
}

/**
 * Drops the user name and token after any `scheme://`, so a remote such as
 * `hg::https://user:token@host/repo` can show in a message or a link.
 */
export function hideCredentials(url: string): string {
  return url.replace(/(:\/\/)[^/\s]*@/g, "$1");
}

/** Drops `.git` at the end only, so a host such as `code.git.corp` stays. */
function stripGitSuffix(url: string): string {
  return url.replace(/\.git(?=\/?$)/, "");
}

function toWebForm(url: string): string | undefined {
  if (/^https?:/.test(url)) return stripGitSuffix(url);
  // `ssh://[user@]host[:port]/owner/repo.git`, also as `git+ssh://`
  const ssh = url.match(
    /^(?:git\+)?ssh(?:\+git)?:\/\/(?:[^@/]*@)?([^:/]+)(?::\d+)?\/(.+)$/
  );
  if (ssh) return `https://${ssh[1]}/${stripGitSuffix(ssh[2])}`;
  // `[user@]host:owner/repo.git`. The path after the colon may start with a
  // digit, as in `1Password/sdk`, so no port is read there. With no user, the
  // host needs a dot, which leaves out a Windows drive and an alias like `gh:`.
  const scp = url.match(/^(?:([^@/]+)@)?([^:/\\]+):(?!\/\/)\/?(.+)$/);
  if (scp && (scp[1] || scp[2].includes("."))) {
    return `https://${scp[2]}/${stripGitSuffix(scp[3])}`;
  }
  if (/^ftps?:/.test(url)) return url.replace(/^ftp/, "http");
  if (url.startsWith("git:")) return url.replace(/^git/, "https");
  return undefined;
}

/**
 * True for an http or https link. A `remoteURLMapping` value from a cloned
 * repo's settings could give `file:` or `vscode:`, which the OS would run.
 */
export function isWebLink(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
