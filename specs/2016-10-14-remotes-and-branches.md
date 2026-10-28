# Work with any branch and odd remote URLs

Done from 2016-10-14 to 2016-12-27, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

The extension broke on repos opened below the git root, on remotes with `@` and on branches other than master.

## User flows it touches

- **Open a link** works from a subfolder and from any branch with a remote.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`test/common.test.ts`** changed.
- **`tsconfig.json`** changed.
- **`typings/index.d.ts`** removed.
- **`typings/modules/ramda/index.d.ts`** removed.
- **`typings/modules/ramda/typings.json`** removed.
- **`typings/node.d.ts`** removed.
- **`typings/vscode-typings.d.ts`** removed.
- **`test/blame.test.ts`** changed.
- **Other files** 2 more.

## Steps, in commit order

1. fix(*): Correct handle project which is not git repo root (ec64035, 2016-10-14)
2. chore(package): Fix publish script (a3c4a26, 2016-10-17)
3. fix(get remotes): Correctly handle urls with @ before github (b96bc28, 2016-12-18)
4. feat(get current branch): Ignore branches without remotes (6972cf7, 2016-12-18)
5. chore(package): v1.3.0 (77fd93c, 2016-12-18)
6. chore(tests): Rename some repos in mocks (013b832, 2016-12-20)
7. fix(*): Consider all branches not only master (bb47912, 2016-12-27)
8. chore(version): 1.3.1 (f30d841, 2016-12-27)

## Docs to update

None.
