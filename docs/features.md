# Features

## Open a file, blame or history link

- **What** opens the file, its blame or its history on the remote host, with the selected lines.
- **Where** the command palette, under `Remote Repo:`, and the editor right click menu for the file link.
- **Limits** the link uses the `openInGitHub.defaultRemote` remote, `origin` by default. History links carry no line anchor.
- **Trusted domains** VS Code asks before it opens a host outside its trusted domains, such as GitLab or a company server. **Configure Trusted Domains** in that dialog stops the question for the host.

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
- **Limits** on `auto`, a host other than `bitbucket.org` and `gitlab.com` gets GitHub links. Bitbucket Server reads the project and repo from the end of the remote, after `/scm` in an https clone URL.

## Languages

- **What it does** the command names, the settings and the messages follow the VS Code display language: English, Russian, German, French, Spanish, Chinese, Japanese, Korean or Norwegian.
- **Where** the command palette, the context menus, the settings page and the pop-up messages.
- **Limits** any other display language gets English. Norwegian shows only with a community language pack, since VS Code ships none.
