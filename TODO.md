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
  2. In the new window, open a file and run each `Remote Repo:` command from the Command Palette: Open File URL, Copy File URL, and the Blame and History ones. Then right click a file and a folder in the Explorer and pick Remote Repo: Open URL and Remote Repo: Copy URL.
  3. Repeat in a GitLab and a Bitbucket repo.
  4. Repeat in a Remote SSH or WSL window, paste the copied link locally and check it is the right URL.
- [ ] Decide whether to run step 12 of rewrite-repo (`reset-history`) on `main`. It wipes the history into one commit and force pushes, so it waits for your yes. Tell an agent "reset the history of vscode-open-in-github" when ready.

## app-audit

- Left: `capabilities.untrustedWorkspaces`, a product call, since it turns the commands off in Restricted Mode.
- Left: an output channel that logs each git call, a new feature.
- Left: a check that the current branch exists on the remote before it gets the link, a product call on the fallback.
- Left: TypeScript 7, esbuild 0.28 and mocha 12, with the last dev advisories, each a major upgrade, and esbuild drops the `watch` option `build.js` uses.
- Left: `@types/vscode` 1.85 above the `engines.vscode` floor of 1.75, a call on the oldest VS Code to support.
- [ ] Try the 2026-11-14 audit fixes in VS Code (F5 in this folder): run Remote Repo: Open File URL from the palette on an image preview, run it on a file outside any git repo, and switch VS Code to Russian (Configure Display Language) to see the error in Russian.
- [ ] Decide on the icon: `assets/icon.jpg` is a GitHub Octodex picture, and the Octodex terms may not allow it as another product's logo. Replace it, or confirm it is fine, before the Marketplace publish.
- [ ] Check the next Release run on main publishes the vsix. Each Release job now gets only its own token rights, and only a real run proves it.
- Left: SSH host aliases such as `git@github-work:o/r.git` give `https://github-work/o/r`, a new feature that reads `ssh -G`.
- Left: Bitbucket Cloud may now anchor lines as `#lines-10:20`, unchecked against the live site.
- Left: `gitlab.com` and `bitbucket.org` match anywhere in the host, so `gitlab.company.com` gets GitLab links. Tightening it is a product call.
- Left: no host test covers `link-command.ts`, `deliver.ts` and `extension.ts`, effort M with a VS Code download in CI.
- Left: two Release runs on one Sydney day inside one Checks run can pick the same tag, a rework of the release flow.
- Left: `jdx/mise-action` installs the newest mise, pinning it is an org-wide `stack` call.
- Left: no `dependabot.yml` or auto-merge, since each merge cuts a release, the owner's call.
- Left: `@types/mocha` 10, `@vscode/test-electron` 3 and the `minimatch` advisory under vsce, each a major upgrade.
- Left: `capabilities.virtualWorkspaces`, a guess with no virtual workspace to check it here.
- Left: `readdirSync` with `recursive` in place of two hand-written walks, needs `@types/node` above 16, the VS Code 1.75 Node.
