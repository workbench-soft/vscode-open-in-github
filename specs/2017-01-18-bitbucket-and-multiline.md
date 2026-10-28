# Bitbucket, a clearer picker and multiline selections

Done from 2017-01-18 to 2017-06-01, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

Bitbucket users asked for the same commands, and a selection of several lines opened only one.

## User flows it touches

- **Bitbucket repo** the commands open Bitbucket.
- **Picker** prefers the default remote.
- **Selection** several lines open as a range.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`test/common.test.ts`** changed.
- **`src/blame.ts`** changed.
- **`src/file.ts`** changed.
- **`src/history.ts`** changed.
- **`test/blame.test.ts`** changed.
- **`test/file.test.ts`** changed.
- **`test/history.test.ts`** changed.

## Steps, in commit order

1. docs(README): Add TODO about multiline selections (e8ead30, 2017-01-18)
2. feat(*): Add Bitbucket support (da0c091, 2017-02-16)
3. docs(readme): Add notes about Bitbucket support (56623e2, 2017-02-16)
4. chore(package): 1.4.0 (d569fea, 2017-02-16)
5. feat: Better display for quick pick items (9e29cf3, 2017-03-28)
6. feat(more opionanted way of deciding which remote to open, in short prefer default remote): (ee57334, 2017-03-28)
7. chore(package): 1.5.0 (7b2f1a3, 2017-03-28)
8. open multiline selections properly in the browser (fb4cad7, 2017-05-31)
9. drop todo for multiline selections (258d06a, 2017-05-31)
10. docs: Update readme (bd9efdc, 2017-06-01)
11. chore: v1.6.0 (30a9175, 2017-06-01)

## Docs to update

- `README.md`
