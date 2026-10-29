# The open-in-remote-repo fork: main or master links and Explorer commands

Built from 2025-10-01 to 2025-10-14. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

The fork needed a name of its own, and the picker asked too often.

## What changes for people

- **Open a link** the link goes to main or master, and no picker shows.
- **Explorer** a right click opens or copies the URL of a file or folder.
- **Symlinked file** the link points at main.

## Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`src/test/common.test.ts`** edited.
- **`src/file.ts`** edited.
- **`src/extension.ts`** edited.
- **`.gitignore`** edited.
- **`src/test/file.test.ts`** edited.

## Commits, oldest first

1. feat: link to main or master without a picker (991be7b, 2025-10-01)
2. feat: open or copy a file or folder URL from the Explorer (8f59875, 2025-10-01)
3. chore: publish as oleg-chibikov.open-in-remote-repo (926d0c3, 2025-10-01)
4. fix: link a symlinked file to main, drop ?plain=1 without lines (656ff0c, 2025-10-14)

## Docs it updated

- `README.md`
