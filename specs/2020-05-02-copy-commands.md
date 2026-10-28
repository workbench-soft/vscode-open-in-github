# Copy the link instead of opening it

Done from 2020-05-02 to 2021-03-02, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

Often the link goes into a chat, not a browser.

## User flows it touches

- **Command palette** copy the file, blame or history link.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`test/common.test.ts`** changed.
- **`src/blame.ts`** changed.
- **`src/extension.ts`** changed.
- **`src/file.ts`** changed.
- **`src/history.ts`** changed.
- **`src/bitbucketServer.ts`** changed.
- **`test/bitbucketServer.test.ts`** changed.
- **`test/blame.test.ts`** changed.
- **Other files** 3 more.

## Steps, in commit order

1. fix: respect defaultRemote when sorting remotes (c151d09, 2020-05-02)
2. 1.13.1 (6b96c81, 2020-05-02)
3. feat: Add copy commands (21994e7, 2020-05-20)
4. chore: add prettier (d8c2d58, 2020-05-20)
5. 1.14.0 (917e4c6, 2020-05-20)
6. feat: update opn -> open (e6d0f6c, 2021-03-02)
7. 1.15.0 (3fdfeb0, 2021-03-02)

## Docs to update

- `README.md`
