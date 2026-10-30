# Open in Remote Repo

A VS Code extension that opens the current file or folder on GitHub, GitLab or Bitbucket, or copies its link.

It forks [Open in GitHub](https://github.com/d4rkr00t/vscode-open-in-github), written by Stanislav Sysoev.

## Install

1. Open VS Code Quick Open (Ctrl+P, or ⌘+P on a Mac).
2. Paste the command below.
3. Press Enter.

```
ext install workbench-soft.open-in-remote-repo
```

Remove the original Open in GitHub before you install. The two extensions share their command ids.

## Use it

Open the command palette (cmd + shift + p / ctrl + shift + p) in a file and pick a command:

- **Remote Repo: Open File URL** opens the file, with the selected lines marked.
- **Remote Repo: Open Blame URL** opens the blame page.
- **Remote Repo: Open History URL** opens the history page.
- **Copy File URL, Copy Blame URL, Copy History URL** put the same links on the clipboard, each under the `Remote Repo:` prefix.

A right click in the editor opens or copies the file URL. A right click on a file or folder in the Explorer does the same for that item.

VS Code asks before it opens a host outside its trusted domains, such as GitLab or a company server. Pick **Configure Trusted Domains** in that dialog to stop the question for that host.

## What it does

- **Branch** links go to main or master. The current branch takes over only while the file is missing from main.
- **Hosts** GitHub, in-house GitHub servers, GitLab, Bitbucket and Bitbucket Server.
- **Default branch** a setting picks the branch to try first.
- **Selections** a selection over several lines links to the whole range.

## Settings

Put these in the workspace settings:

```js
{
  ...
  // The branch to try first. Empty tries the remote default, then main, then master
  "openInGitHub.defaultBranch": "",
  "openInGitHub.defaultRemote": "origin",

  // Swaps one remote URL for another in the generated link
  "openInGitHub.remoteURLMapping": {
    "https://mirror.github.com": "https://github.com",
  }
  ...
}
```

`openInGitHub.repositoryType` picks the host: `auto` (the default), `github`, `bitbucket`, `bitbucket-server` or `gitlab`.

## Develop

[mise](https://mise.jdx.dev) pins Node 22 and runs the checks.

| Task                                 | Command                              |
| ------------------------------------ | ------------------------------------ |
| Install the packages                 | `mise x -- npm ci`                   |
| Lint, typecheck and unit tests       | `mise run check`                     |
| Bundle into `out/extension.js`       | `mise x -- npm run compile`          |
| Tests inside a VS Code window        | `mise x -- npm test`                 |
| Package into `dist/` as a `.vsix`    | `mise run build`                     |
| Build and publish to the Marketplace | `mise x -- npm exec -- vsce publish` |

Press F5 in VS Code to start a window with the extension loaded. `docs/architecture.md` maps the code.

Each push to main and each PR runs `mise run check` and the production build in `.github/workflows/checks.yml`, on `ubuntu-latest`.

## Release

Each push to main whose Checks pass gets a [GitHub release](https://github.com/workbench-soft/vscode-open-in-github/releases) with the `.vsix` attached.

- **Tag** the date in Sydney and the release of the day, such as `v2026.10.30.1`.
- **Extension version** vsce takes semver only, so that `.vsix` reads `2026.1030.1`. The version in git stays as it is.
- **Install** download the `.vsix` and run `code --install-extension open-in-remote-repo-2026.1030.1.vsix`.
- **Marketplace** a person publishes with `mise x -- npm exec -- vsce publish`, since it needs a token.

## Credits

[Stanislav Sysoev](https://github.com/d4rkr00t) wrote [Open in GitHub](https://github.com/d4rkr00t/vscode-open-in-github), and this extension started as a fork of it. Its MIT licence and copyright stay in `LICENSE`.

The logo comes from [https://octodex.github.com/](https://octodex.github.com/).
