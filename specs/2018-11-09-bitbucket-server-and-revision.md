# Bitbucket Server, a git output limit and the current commit

Built on 2018-11-09. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

Self hosted Bitbucket had no support. In big repos the git output also ran past its buffer.

## What changes for people

- **Bitbucket Server** the commands build links for it.
- **Settings** `maxBuffer` raises the limit on git output.
- **Picker** one entry links to the current commit.

## Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/common.test.ts`** edited.
- **`src/bitbucketServer.ts`** added.
- **`src/blame.ts`** edited.
- **`src/file.ts`** edited.
- **`src/history.ts`** edited.
- **`test/bitbucketServer.test.ts`** added.

## Commits, oldest first

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

## Docs it updated

- `README.md`
