# Remotes and hosts

## What it does for the person

Links work for GitHub, Bitbucket, Bitbucket Server and GitLab, any branch, multi-root workspaces and mapped remotes.

## User flows

None written down yet.

## How it works: modules, files, data

Each entry below names the files it changed.

## Limits

None written down yet.

## Changes

### 2016-10-14 Links from subfolders, any branch and unusual remote URLs

Built from 2016-10-14 to 2016-12-27. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

The extension failed in 3 cases: a folder opened below the git root, a remote URL with `@`, and a branch other than master.

#### What changes for people

- **Open a link** the command works in a subfolder and on any branch that has a remote.

#### Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/common.test.ts`** edited.
- **`tsconfig.json`** edited.
- **`typings/index.d.ts`** deleted.
- **`typings/modules/ramda/index.d.ts`** deleted.
- **`typings/modules/ramda/typings.json`** deleted.
- **`typings/node.d.ts`** deleted.
- **`typings/vscode-typings.d.ts`** deleted.
- **`test/blame.test.ts`** edited.
- **The rest** 2 more files.

#### Commits, oldest first

1. fix(*): Correct handle project which is not git repo root (ec64035, 2016-10-14)
2. chore(package): Fix publish script (a3c4a26, 2016-10-17)
3. fix(get remotes): Correctly handle urls with @ before github (b96bc28, 2016-12-18)
4. feat(get current branch): Ignore branches without remotes (6972cf7, 2016-12-18)
5. chore(package): v1.3.0 (77fd93c, 2016-12-18)
6. chore(tests): Rename some repos in mocks (013b832, 2016-12-20)
7. fix(*): Consider all branches not only master (bb47912, 2016-12-27)
8. chore(version): 1.3.1 (f30d841, 2016-12-27)

#### Docs it updated

No doc needed a change.

### 2017-01-18 Bitbucket, a clearer picker and selections over several lines

Built from 2017-01-18 to 2017-06-01. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

Bitbucket users wanted the same commands. A selection over several lines also opened just its first line.

#### What changes for people

- **Bitbucket repo** each command opens the page on Bitbucket.
- **Picker** the default remote comes first.
- **Selection** a selection over several lines opens as a line range.

#### Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/common.test.ts`** edited.
- **`src/blame.ts`** edited.
- **`src/file.ts`** edited.
- **`src/history.ts`** edited.
- **`test/blame.test.ts`** edited.
- **`test/file.test.ts`** edited.
- **`test/history.test.ts`** edited.

#### Commits, oldest first

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

#### Docs it updated

- `README.md`

### 2017-11-09 Workspaces with several folders

Built from 2017-11-09 to 2018-03-02. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

A workspace with several folders made the extension read the wrong repo.

#### What changes for people

- **Multi-root workspace** each file links into the repo it belongs to.

#### Files

- **`package.json`** edited.
- **`src/common.ts`** edited.

#### Commits, oldest first

1. Multi-root support (ab62697, 2017-11-09)
2. chore: v1.7.0 (2a55f66, 2018-03-02)

#### Docs it updated

No doc needed a change.

### 2018-11-09 Bitbucket Server, a git output limit and the current commit

Built on 2018-11-09. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

Self hosted Bitbucket had no support. In big repos the git output also ran past its buffer.

#### What changes for people

- **Bitbucket Server** the commands build links for it.
- **Settings** `maxBuffer` raises the limit on git output.
- **Picker** one entry links to the current commit.

#### Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/common.test.ts`** edited.
- **`src/bitbucketServer.ts`** added.
- **`src/blame.ts`** edited.
- **`src/file.ts`** edited.
- **`src/history.ts`** edited.
- **`test/bitbucketServer.test.ts`** added.

#### Commits, oldest first

1. add bitbucket server support (8433de5, 2018-11-09)
2. Make `maxBuffer` configurable. (15be9c7, 2018-07-13)
3. Add documentation (9483ccf, 2018-07-13)
4. Make `maxBuffer` optional (d8b4937, 2018-07-13)
5. Set default correctly (5f6c62d, 2018-07-13)
6. Don't default if we don't need to (6002982, 2018-07-13)
7. fix: Fix issues after merging prs (ce545c2, 2018-11-09)
8. chore: v1.8.0 (48d5e17, 2018-11-09)
9. fix: Handle failed match in common#formatRemotes. (a7b60ed, 2018-09-27)
10. test: Add test for symlinked remotes (54f0198, 2018-11-09)
11. chore: Udpate dependencies to solve security issues (db40627, 2018-11-09)
12. chore: Remove unused dependenceis (b8aee6b, 2018-11-09)
13. fix: Fix title for extension configuration (cb706d2, 2018-11-09)
14. chore: Update depdendencies (982692b, 2018-11-09)
15. feat: Allow option for current revision to be included in the picklist of URL options. (a6482fe, 2018-07-05)
16. 1.9.0 (a96ecff, 2018-11-09)
17. fix: Correctly join branches links (a28a34b, 2018-11-09)
18. 1.10.0 (c950a84, 2018-11-09)

#### Docs it updated

- `README.md`

### 2018-11-28 GitLab links and correct line ranges

Built from 2018-11-28 to 2019-09-14. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

GitLab users needed the commands. Line ranges also came out in the wrong format.

#### What changes for people

- **GitLab repo** each command opens GitLab with a correct line range.
- **Branch names** the link escapes special characters in them.

#### Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`test/file.test.ts`** edited.
- **`src/blame.ts`** edited.
- **`src/file.ts`** edited.
- **`src/history.ts`** edited.
- **`test/blame.test.ts`** edited.
- **`test/common.test.ts`** edited.

#### Commits, oldest first

1. fix: Update dependencies that contained compromised event-stream library (4a84b2d, 2018-11-28)
2. 1.10.1 (6b85f47, 2018-11-28)
3. fix: escape branch names in github url (5363fc7, 2018-11-23)
4. feat: Use dash instead of colon for GitHub line pointer (7712688, 2019-01-02)
5. chore: fix tests after 7712688 (8b06909, 2019-02-13)
6. 1.11.0 (1f292c2, 2019-02-13)
7. 1.12.0 (03fe82e, 2019-02-13)
8. fix line formatting for gitlab urls (don't add 'L' from second line when present) (70eb6be, 2019-09-10)
9. fix: Fix npm audit warnings (93e27d5, 2019-09-14)
10. 1.13.0 (bda9a44, 2019-09-14)
11. docs: add gitlab support to docs (16267d3, 2019-09-14)

#### Docs it updated

- `README.md`

### 2024-01-14 Mapped remote URLs and a right click menu

Built from 2024-01-14 to 2024-08-08. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

#### The problem

A mirror or a proxy needs its URL swapped for the real one. A right click is also quicker than the palette.

#### What changes for people

- **Settings** a mapping swaps one remote URL for another.
- **Right click** the editor menu opens or copies the file URL.
- **Settings** a switch makes every link use the default branch.

#### Files

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

#### Commits, oldest first

1. feat: add remote mapping (2f7b923, 2024-01-14)
2. fix: address linting warnings in package.json (52c2f62, 2024-01-14)
3. feat: add open and copy file url to context menu (8c1fb66, 2024-01-14)
4. feat: a setting to force to always generate urls with default branch only (57fd706, 2024-01-14)
5. chore: change main in package.json (33d5e73, 2024-01-14)
6. chore: fix vscodeignore (1778cf3, 2024-01-14)
7. 1.18.0 (bed5a60, 2024-01-14)
8. docs: Fix configuration typo in README.md (#60) (7c76318, 2024-08-08)

#### Docs it updated

- `README.md`
