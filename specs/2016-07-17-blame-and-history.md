# Blame and history commands

Done on 2016-07-17, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

The GitHub blame and history pages were the next things people opened.

## User flows it touches

- **Command palette** open the blame or the history of the file on GitHub.

## Changes

- **`package.json`** changed.
- **`src/extension.ts`** changed.
- **`src/common.ts`** new.
- **`src/file.ts`** new.
- **`test/common.test.ts`** changed.
- **`test/file.test.ts`** new.
- **`src/blame.ts`** new.
- **`test/blame.test.ts`** new.
- **`src/history.ts`** new.
- **`test/history.test.ts`** new.

## Steps, in commit order

1. refactor(*): Move common parts to separate file (147e9bb, 2016-07-17)
2. feat(commands): Blame command (6ea673f, 2016-07-17)
3. chore(version): v1.1.0 (645206f, 2016-07-17)
4. fix(extension): Add activation event on openInGithubBlame command (8b39f66, 2016-07-17)
5. chore(version): v1.1.1 (fec6a49, 2016-07-17)
6. docs(readme): Remove todo about blame (0edb2c6, 2016-07-17)
7. feat(commands): History command (379db08, 2016-07-17)
8. chore(version): v1.2.0 (a9a4f36, 2016-07-17)

## Docs to update

- `README.md`
