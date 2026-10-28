# Publish as open-in-remote-repo with main or master links and Explorer commands

Done from 2026-10-01 to 2026-10-14, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

The fork needed its own name and fewer prompts.

## User flows it touches

- **Open a link** goes to main or master with no picker.
- **Explorer** open or copy a file or folder URL.
- **Symlinked file** links to main.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`src/test/common.test.ts`** changed.
- **`src/file.ts`** changed.
- **`src/extension.ts`** changed.
- **`.gitignore`** changed.
- **`src/test/file.test.ts`** changed.

## Steps, in commit order

1. feat: link to main or master without a picker (991be7b, 2026-10-01)
2. feat: open or copy a file or folder URL from the Explorer (8f59875, 2026-10-01)
3. chore: publish as oleg-chibikov.open-in-remote-repo (926d0c3, 2026-10-01)
4. fix: link a symlinked file to main, drop ?plain=1 without lines (656ff0c, 2026-10-14)

## Docs to update

- `README.md`
