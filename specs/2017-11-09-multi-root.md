# Multi-root workspaces

Done from 2017-11-09 to 2018-03-02, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

In a workspace with several folders the extension read the wrong repo.

## User flows it touches

- **Multi-root workspace** each file opens in its own repo.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.

## Steps, in commit order

1. Multi-root support (ab62697, 2017-11-09)
2. chore: v1.7.0 (2a55f66, 2018-03-02)

## Docs to update

None.
