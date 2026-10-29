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
