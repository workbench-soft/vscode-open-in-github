# Open and copy links

## What it does for the person

Commands open or copy the GitHub link of the file, its blame or its history at the selected lines.

## User flows

None written down yet.

## How it works: modules, files, data

Each entry below names the files it changed.

## Limits

None written down yet.

## Changes

### 2016-05-27 Jump from VS Code to the file on GitHub

Built from 2016-05-27 to 2016-05-29. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

People shared links by looking the file up on GitHub by hand, and that was slow.

#### What changes for people

- **Command palette** a command opens the file on GitHub at the cursor line.
- **Settings** a setting names the default branch.

#### Files

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

#### Commits, oldest first

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

#### Docs it updated

- `README.md`

### 2016-07-17 Commands for the blame and history pages

Built on 2016-07-17. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

After the file, people went on to its blame and history pages on GitHub.

#### What changes for people

- **Command palette** 2 new commands open the file's blame or history on GitHub.

#### Files

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

#### Commits, oldest first

1. refactor(*): Move common parts to separate file (147e9bb, 2016-07-17)
2. feat(commands): Blame command (6ea673f, 2016-07-17)
3. chore(version): v1.1.0 (645206f, 2016-07-17)
4. fix(extension): Add activation event on openInGithubBlame command (8b39f66, 2016-07-17)
5. chore(version): v1.1.1 (fec6a49, 2016-07-17)
6. docs(readme): Remove todo about blame (0edb2c6, 2016-07-17)
7. feat(commands): History command (379db08, 2016-07-17)
8. chore(version): v1.2.0 (a9a4f36, 2016-07-17)

#### Docs it updated

- `README.md`

### 2020-05-02 Commands that copy the link

Built from 2020-05-02 to 2021-03-02. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

Many links end up pasted in a chat, so a browser tab gets in the way.

#### What changes for people

- **Command palette** 3 new commands copy the file, blame or history link.

#### Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/common.test.ts`** edited.
- **`src/blame.ts`** edited.
- **`src/extension.ts`** edited.
- **`src/file.ts`** edited.
- **`src/history.ts`** edited.
- **`src/bitbucketServer.ts`** edited.
- **`test/bitbucketServer.test.ts`** edited.
- **`test/blame.test.ts`** edited.
- **The rest** 3 more files.

#### Commits, oldest first

1. fix: respect defaultRemote when sorting remotes (c151d09, 2020-05-02)
2. 1.13.1 (6b96c81, 2020-05-02)
3. feat: Add copy commands (21994e7, 2020-05-20)
4. chore: add prettier (d8c2d58, 2020-05-20)
5. 1.14.0 (917e4c6, 2020-05-20)
6. feat: update opn -> open (e6d0f6c, 2021-03-02)
7. 1.15.0 (3fdfeb0, 2021-03-02)

#### Docs it updated

- `README.md`
