# Workspaces with several folders

Built from 2017-11-09 to 2018-03-02. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

A workspace with several folders made the extension read the wrong repo.

## What changes for people

- **Multi-root workspace** each file links into the repo it belongs to.

## Files

- **`package.json`** edited.
- **`src/common.ts`** edited.

## Commits, oldest first

1. Multi-root support (ab62697, 2017-11-09)
2. chore: v1.7.0 (2a55f66, 2018-03-02)

## Docs it updated

No doc needed a change.
