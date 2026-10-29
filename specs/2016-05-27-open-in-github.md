# Jump from VS Code to the file on GitHub

Built from 2016-05-27 to 2016-05-29. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

People shared links by looking the file up on GitHub by hand, and that was slow.

## What changes for people

- **Command palette** a command opens the file on GitHub at the cursor line.
- **Settings** a setting names the default branch.

## Files

- **`package.json`** added.
- **`src/extension.ts`** added.
- **`test/extension.test.ts`** added.
- **`.gitignore`** added.
- **`.editorconfig`** added.
- **`.vscodeignore`** added.
- **`test/index.ts`** added.
- **`tsconfig.json`** added.
- **`.vscode/launch.json`** added.
- **`.vscode/settings.json`** added.
- **The rest** 9 more files.

## Commits, oldest first

1. feat(*): Init (ac4bc18, 2016-05-27)
2. test(*): Increase test coverage (abc5a0d, 2016-05-28)
3. chore(dev): Add .vscode configs and typings (dcbba9f, 2016-05-28)
4. chore(dev): Add commitizen (31854f9, 2016-05-28)
5. feat(ext): Open file in particular line (f77c90c, 2016-05-28)
6. test(*): More tests (025d475, 2016-05-28)
7. refactor(ext): Use ramda (ea0093b, 2016-05-28)
8. feat(ext): Configurable default branch (820ebf8, 2016-05-28)
9. chore(*): Publish preparations (cf3be51, 2016-05-29)
10. docs(readme): Change code snippet type (1db419f, 2016-05-29)
11. docs(package,readme): Update display name and docs (eb282c6, 2016-05-29)
12. chore(version): v1.0.1 (a78e3d1, 2016-05-29)

## Docs it updated

- `README.md`
