# Remote mapping and a context menu

Done from 2024-01-14 to 2024-08-08, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

Mirrors and proxies need their URLs mapped, and the palette is slower than a right click.

## User flows it touches

- **Settings** map one remote URL to another.
- **Right click** open or copy the file URL.
- **Settings** always link to the default branch.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`src/bitbucketServer.ts`** changed.
- **`src/blame.ts`** changed.
- **`src/file.ts`** changed.
- **`src/history.ts`** changed.
- **`src/test/bitbucketServer.test.ts`** changed.
- **`src/test/blame.test.ts`** changed.
- **`src/test/common.test.ts`** changed.
- **`src/test/file.test.ts`** changed.
- **Other files** 2 more.

## Steps, in commit order

1. feat: add remote mapping (2f7b923, 2024-01-14)
2. fix: address linting warnings in package.json (52c2f62, 2024-01-14)
3. feat: add open and copy file url to context menu (8c1fb66, 2024-01-14)
4. feat: a setting to force to always generate urls with default branch only (57fd706, 2024-01-14)
5. chore: change main in package.json (33d5e73, 2024-01-14)
6. chore: fix vscodeignore (1778cf3, 2024-01-14)
7. 1.18.0 (bed5a60, 2024-01-14)
8. docs: Fix configuration typo in README.md (#60) (7c76318, 2024-08-08)

## Docs to update

- `README.md`
