# Commands for the blame and history pages

Built on 2016-07-17. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

After the file, people went on to its blame and history pages on GitHub.

## What changes for people

- **Command palette** 2 new commands open the file's blame or history on GitHub.

## Files

- **`package.json`** edited.
- **`src/extension.ts`** edited.
- **`src/common.ts`** added.
- **`src/file.ts`** added.
- **`test/common.test.ts`** edited.
- **`test/file.test.ts`** added.
- **`src/blame.ts`** added.
- **`test/blame.test.ts`** added.
- **`src/history.ts`** added.
- **`test/history.test.ts`** added.

## Commits, oldest first

1. refactor(*): Move common parts to separate file (147e9bb, 2016-07-17)
2. feat(commands): Blame command (6ea673f, 2016-07-17)
3. chore(version): v1.1.0 (645206f, 2016-07-17)
4. fix(extension): Add activation event on openInGithubBlame command (8b39f66, 2016-07-17)
5. chore(version): v1.1.1 (fec6a49, 2016-07-17)
6. docs(readme): Remove todo about blame (0edb2c6, 2016-07-17)
7. feat(commands): History command (379db08, 2016-07-17)
8. chore(version): v1.2.0 (a9a4f36, 2016-07-17)

## Docs it updated

- `README.md`
