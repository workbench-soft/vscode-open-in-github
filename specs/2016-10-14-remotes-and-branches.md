# Links from subfolders, any branch and unusual remote URLs

Built from 2016-10-14 to 2016-12-27. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

The extension failed in 3 cases: a folder opened below the git root, a remote URL with `@`, and a branch other than master.

## What changes for people

- **Open a link** the command works in a subfolder and on any branch that has a remote.

## Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/common.test.ts`** edited.
- **`tsconfig.json`** edited.
- **`typings/index.d.ts`** deleted.
- **`typings/modules/ramda/index.d.ts`** deleted.
- **`typings/modules/ramda/typings.json`** deleted.
- **`typings/node.d.ts`** deleted.
- **`typings/vscode-typings.d.ts`** deleted.
- **`test/blame.test.ts`** edited.
- **The rest** 2 more files.

## Commits, oldest first

1. fix(*): Correct handle project which is not git repo root (ec64035, 2016-10-14)
2. chore(package): Fix publish script (a3c4a26, 2016-10-17)
3. fix(get remotes): Correctly handle urls with @ before github (b96bc28, 2016-12-18)
4. feat(get current branch): Ignore branches without remotes (6972cf7, 2016-12-18)
5. chore(package): v1.3.0 (77fd93c, 2016-12-18)
6. chore(tests): Rename some repos in mocks (013b832, 2016-12-20)
7. fix(*): Consider all branches not only master (bb47912, 2016-12-27)
8. chore(version): 1.3.1 (f30d841, 2016-12-27)

## Docs it updated

No doc needed a change.
