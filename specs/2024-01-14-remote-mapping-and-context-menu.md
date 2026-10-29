# Mapped remote URLs and a right click menu

Built from 2024-01-14 to 2024-08-08. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

A mirror or a proxy needs its URL swapped for the real one. A right click is also quicker than the palette.

## What changes for people

- **Settings** a mapping swaps one remote URL for another.
- **Right click** the editor menu opens or copies the file URL.
- **Settings** a switch makes every link use the default branch.

## Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`src/bitbucketServer.ts`** edited.
- **`src/blame.ts`** edited.
- **`src/file.ts`** edited.
- **`src/history.ts`** edited.
- **`src/test/bitbucketServer.test.ts`** edited.
- **`src/test/blame.test.ts`** edited.
- **`src/test/common.test.ts`** edited.
- **`src/test/file.test.ts`** edited.
- **The rest** 2 more files.

## Commits, oldest first

1. feat: add remote mapping (2f7b923, 2024-01-14)
2. fix: address linting warnings in package.json (52c2f62, 2024-01-14)
3. feat: add open and copy file url to context menu (8c1fb66, 2024-01-14)
4. feat: a setting to force to always generate urls with default branch only (57fd706, 2024-01-14)
5. chore: change main in package.json (33d5e73, 2024-01-14)
6. chore: fix vscodeignore (1778cf3, 2024-01-14)
7. 1.18.0 (bed5a60, 2024-01-14)
8. docs: Fix configuration typo in README.md (#60) (7c76318, 2024-08-08)

## Docs it updated

- `README.md`
