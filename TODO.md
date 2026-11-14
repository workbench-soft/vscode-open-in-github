# TODO

## publisher-workbench-soft

- [ ] Publish the extension. The Marketplace has no `workbench-soft.open-in-remote-repo` yet, so users don't get the `openInGitHub.defaultRemote` fix.
  1. Sign in at <https://marketplace.visualstudio.com/manage> and create the publisher with ID `workbench-soft`.
  2. Make a personal access token with the Marketplace Manage scope at <https://dev.azure.com>. Store it in the Bitwarden project `workbench-soft` as `VSCE_PAT`, and tell an agent it is ready.
  3. The agent bumps the version and runs `bws run -- mise x -- npm exec -- vsce publish`, the command in the README Release section. vsce reads the token from `VSCE_PAT`.

## auto-merge

- [ ] Turn on "Allow auto-merge" in the 40 private repos of `oleg-chibikov` and `workbench-soft` once the account or org moves to a paid GitHub plan; the Free plan ignores it for private repos.

## rewrite-repo

- [ ] Try Open and Copy by hand in VS Code. `npm test` passes in VS Code 1.146 (131 tests, 2026-11-13); these clicks need you.
  1. Open this folder in VS Code and press F5.
  2. In the new window, open a file and run Open in GitHub and Copy File URL from the Command Palette, for the file, blame, history and Explorer commands.
  3. Repeat in a GitLab and a Bitbucket repo.
  4. Repeat in a Remote SSH or WSL window, paste the copied link locally and check it is the right URL.
- [ ] Decide whether to run step 12 of rewrite-repo (`reset-history`) on `main`. It wipes the history into one commit and force pushes, so it waits for your yes. Tell an agent "reset the history of vscode-open-in-github" when ready.

## app-audit

- Left: `capabilities.untrustedWorkspaces`, a product call, since it turns the commands off in Restricted Mode.
- Left: an output channel that logs each git call, a new feature.
- Left: a check that the current branch exists on the remote before it gets the link, a product call on the fallback.
- Left: TypeScript 7, esbuild 0.28 and mocha 12, with the last dev advisories, each a major upgrade, and esbuild drops the `watch` option `build.js` uses.
- Left: `@types/vscode` 1.85 above the `engines.vscode` floor of 1.75, a call on the oldest VS Code to support.
