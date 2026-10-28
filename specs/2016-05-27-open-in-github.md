# Open the current file in GitHub from VS Code

Done from 2016-05-27 to 2016-05-29, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

Finding the file on GitHub by hand to share a link took too long.

## User flows it touches

- **Command palette** open the file on GitHub at the current line.
- **Settings** pick the default branch.

## Changes

- **`package.json`** new.
- **`src/extension.ts`** new.
- **`test/extension.test.ts`** new.
- **`.gitignore`** new.
- **`.editorconfig`** new.
- **`.vscodeignore`** new.
- **`test/index.ts`** new.
- **`tsconfig.json`** new.
- **`.vscode/launch.json`** new.
- **`.vscode/settings.json`** new.
- **Other files** 9 more.

## Steps, in commit order

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

## Docs to update

- `README.md`
