# Audit fixes: safer links, more remotes, a browser that opens in remote windows

## What it does for the person

None written down yet.

## User flows

None written down yet.

## How it works: modules, files, data

Each entry below names the files it changed.

## Limits

None written down yet.

## Changes

### 2026-10-30 Audit fixes: safer links, more remotes, a browser that opens in remote windows

Planned on 2026-10-30 from an app audit of the whole repo. Each fix is its own commit.

#### The problem

- **Open** the `open` package passes the link through PowerShell on Windows, so `users.$id.tsx` opens as `users..tsx`. In SSH and container windows it opens no browser on the person's machine.
- **Remotes** a token in a GitLab remote lands in the link, and some remotes give a wrong host or no link at all.
- **Partial clones** each click downloads the file up to 4 times, and offline it waits 23 seconds.
- **Lines** a selection that ends at the start of a line links one line too many.

#### What changes for people

- **Open** links open through VS Code, on the person's machine, in local and remote windows. VS Code asks before it opens a host outside its trusted domains, such as GitLab.
- **Tokens** user names and tokens in https remotes stay out of the link.
- **Remotes** owners that start with a digit, Bitbucket Server `/scm/` remotes and aliases such as `gh:owner/repo` give the right link. An `insteadOf` mirror stays out of the link.
- **Paths** file names with `#`, `?`, `%`, `$` or a space are escaped.
- **Errors** a remote with no web form, and an unsaved file, show a message in place of silence.
- **Speed** the branch check reads only trees, so a partial clone fetches nothing, and git stops after 10 seconds.

#### Files

- **`src/links/`** remote parsing, host detection, path escaping, Bitbucket Server.
- **`src/git/`** branch check, git timeout, remote URL, repo path on another drive.
- **`src/commands/`** opening through VS Code, the selected lines, the error messages.
- **`package.json`** the `open` package goes, the setting text is rewritten.
- **`tsconfig.json`** strict type checks.
- **`.github/workflows/checks.yml`** runs `mise run check` on each push to main.

#### Left for later

The `## app-audit` section of `TODO.md` lists the findings left and the reason.

### 2026-11-14 Audit fixes: translated errors, previews, branch and path edge cases

Planned on 2026-11-14 from a second app audit of the whole repo. Each fix is its own commit.

- **Errors** git timeouts, a missing remote, a file outside a repo and a PC without git show a translated message. `src/known-error.ts` carries the English key from `git/` and `links/`.
- **Previews** the palette commands read the active tab when no text editor is open.
- **Branch** the branch check names `refs/remotes/<remote>/<branch>` in full, and runs beside the remote HEAD lookup.
- **Paths** a deleted folder or a symlinked workspace still gives the right repo path.
- **Remotes** `.git` goes from `git://` and `ftp://` remotes on every host.
- **Package** a 256 px icon, the dead `pre-commit` and `lint-staged` packages gone, minor tool updates.
- **CI** each Release job gets only the token rights it uses.

Files: `src/`, `l10n/`, `package.json`, `package-lock.json`, `assets/`, `.github/workflows/release.yml`, the docs and `TODO.md`.
