# TODO

## publisher-workbench-soft

- [ ] Create the `workbench-soft` publisher at https://marketplace.visualstudio.com/manage before the next `vsce publish`.

## auto-merge
- [ ] Turn on "Allow auto-merge" in the 40 private repos of `oleg-chibikov` and `workbench-soft` once the account or org moves to a paid GitHub plan; the Free plan ignores it for private repos.

## rewrite-repo

- [ ] Press F5 or run `mise x -- npm test`, then try Open and Copy for the file, blame, history and Explorer commands. The fast run skipped the VS Code test window.
- [ ] Try Copy File URL in a Remote SSH or WSL window and paste locally, to confirm the `vscode.env.clipboard` fix.
- [ ] Bump the version and publish with `mise x -- npx @vscode/vsce publish`, so users get the fix for `openInGitHub.defaultRemote` running shell commands.
- [ ] Run step 12 of rewrite-repo (`reset-history`) on `master` when ready. The rewrite commits are local and unpushed.
- [ ] Decide on `assets/multiple-remotes-and-branches.png`. No file references it, and it shows the old remote and branch picker.

## app-audit

- [ ] Run `mise x -- npm test` or press F5, then try Open and Copy on a GitHub, a GitLab and a Bitbucket repo, in a local and a Remote SSH or WSL window. Open now goes through `vscode.env.openExternal` (PR #4).
- Left: `capabilities.untrustedWorkspaces`, a product call, since it turns the commands off in Restricted Mode.
- Left: an output channel that logs each git call, a new feature.
- Left: a check that the current branch exists on the remote before it gets the link, a product call on the fallback.
- Left: TypeScript 7, esbuild 0.28, prettier 3 and mocha 12, with the last 5 dev advisories, each a major upgrade, and esbuild drops the `watch` option `build.js` uses.
- Left: `@types/vscode` 1.85 above the `engines.vscode` floor of 1.75, a call on the oldest VS Code to support.
