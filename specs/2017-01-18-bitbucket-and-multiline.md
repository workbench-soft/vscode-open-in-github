# Bitbucket, a clearer picker and selections over several lines

Built from 2017-01-18 to 2017-06-01. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

Bitbucket users wanted the same commands. A selection over several lines also opened just its first line.

## What changes for people

- **Bitbucket repo** each command opens the page on Bitbucket.
- **Picker** the default remote comes first.
- **Selection** a selection over several lines opens as a line range.

## Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/common.test.ts`** edited.
- **`src/blame.ts`** edited.
- **`src/file.ts`** edited.
- **`src/history.ts`** edited.
- **`test/blame.test.ts`** edited.
- **`test/file.test.ts`** edited.
- **`test/history.test.ts`** edited.

## Commits, oldest first

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

## Docs it updated

- `README.md`
