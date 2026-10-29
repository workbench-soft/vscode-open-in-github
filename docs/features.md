# Features

## Open a file, blame or history link

- **What** opens the file, its blame or its history on the remote host, with the selected lines.
- **Where** the command palette, under `Remote Repo:`, and the editor right click menu for the file link.
- **Limits** the link uses the `openInGitHub.defaultRemote` remote, `origin` by default. History links carry no line anchor.

## Copy a link

- **What** puts the same links on the clipboard and shows a notice with the URL.
- **Where** the `Remote Repo: Copy` commands and the editor right click menu.
- **Limits** the copy goes through VS Code, so a remote window fills the local clipboard.

## Links from the Explorer

- **What** opens or copies the link of a file or a folder.
- **Where** the Explorer right click menu.
- **Limits** the link has no line anchor.

## Main or master first

- **What** links point at a branch that already holds the file: `openInGitHub.defaultBranch`, the remote HEAD, `main`, then `master`.
- **Where** every command. The setting is in the VS Code settings.
- **Limits** a file missing from those branches links to the current branch, or to the commit on a detached HEAD.

## Hosts and mapped URLs

- **What** GitHub and GitHub servers, GitLab, Bitbucket and Bitbucket Server. `openInGitHub.remoteURLMapping` swaps a remote URL for another.
- **Where** `openInGitHub.repositoryType` picks the host. `auto` reads it from the remote URL.
- **Limits** on `auto`, a host other than `bitbucket.org` and `gitlab.com` gets GitHub links. Bitbucket Server needs a `https://host/project/repo` remote.
