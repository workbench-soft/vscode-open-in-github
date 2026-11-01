# Move to the Workbench Soft organization

## What it does for the person

The repo lives in the private workbench-soft organization, and CI runs on the Workbench Soft runner.

## User flows

None written down yet.

## How it works: modules, files, data

Each entry below names the files it changed.

## Limits

None written down yet.

## Changes

### 2025-10-28 vscode-open-in-github moves to workbench-soft as a private repo

#### The problem

The repo left `oleg-chibikov` for the `workbench-soft` org, and it is private now.
The homepage, repo and issues fields in `package.json` still held the old address.

#### What changes for people

- **Marketplace page** the next publish takes its Repository and Issues links from `package.json`.

#### Files

- **`package.json`** `homepage`, `repository` and `bugs` point at `workbench-soft`. The publisher keeps the Marketplace id `oleg-chibikov`.
- **`CHANGELOG.md`** added, holding one entry.

#### Commits, oldest first

1. Make `package.json` name the new owner.

#### Docs it updated

- None. The README holds the Marketplace id and no repo address.
