# Move vscode-open-in-github to workbench-soft and make it private

## Why

The repo moved from `oleg-chibikov` to the `workbench-soft` org and is private now.
`package.json` still names the old address for the homepage, the repo and the issues.

## User flows it touches

- **Marketplace page** its Repository and Issues links come from `package.json` on the next publish.

## Changes

- **`package.json`** `homepage`, `repository` and `bugs` name `workbench-soft`. The publisher stays `oleg-chibikov`, the Marketplace id.
- **`CHANGELOG.md`** new, with one entry.

## Steps, in commit order

1. Point `package.json` at the new owner.

## Docs to update

- None. The README names the Marketplace id only.
