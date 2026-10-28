# Bitbucket Server, a buffer setting and the current revision

Done on 2018-11-09, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

Self hosted Bitbucket was missing and big repos overflowed the git output buffer.

## User flows it touches

- **Bitbucket Server** links work.
- **Settings** `maxBuffer` sets the git output limit.
- **Picker** offers a link to the current commit.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`test/common.test.ts`** changed.
- **`src/bitbucketServer.ts`** new.
- **`src/blame.ts`** changed.
- **`src/file.ts`** changed.
- **`src/history.ts`** changed.
- **`test/bitbucketServer.test.ts`** new.

## Steps, in commit order

1. add bitbucket server support (8433de5, 2018-11-09)
2. Make `maxBuffer` configurable. (15be9c7, 2018-07-13)
3. Add documentation (9483ccf, 2018-07-13)
4. Make `maxBuffer` optional (d8b4937, 2018-07-13)
5. Set default correctly (5f6c62d, 2018-07-13)
6. Don't default if we don't need to (6002982, 2018-07-13)
7. fix: Fix issues after merging prs (ce545c2, 2018-11-09)
8. chore: v1.8.0 (48d5e17, 2018-11-09)
9. fix: Handle failed match in common#formatRemotes. (a7b60ed, 2018-09-27)
10. test: Add test for symlinked remotes (54f0198, 2018-11-09)
11. chore: Udpate dependencies to solve security issues (db40627, 2018-11-09)
12. chore: Remove unused dependenceis (b8aee6b, 2018-11-09)
13. fix: Fix title for extension configuration (cb706d2, 2018-11-09)
14. chore: Update depdendencies (982692b, 2018-11-09)
15. feat: Allow option for current revision to be included in the picklist of URL options. (a6482fe, 2018-07-05)
16. 1.9.0 (a96ecff, 2018-11-09)
17. fix: Correctly join branches links (a28a34b, 2018-11-09)
18. 1.10.0 (c950a84, 2018-11-09)

## Docs to update

- `README.md`
