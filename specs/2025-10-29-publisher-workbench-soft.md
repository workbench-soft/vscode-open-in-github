# Name the extension's publisher workbench-soft instead of my name

## Why

The extension id is `oleg-chibikov.open-in-remote-repo`. The repo belongs to `workbench-soft` now, so the publisher should too.

## User flows it touches

- **Install** the id becomes `workbench-soft.open-in-remote-repo`. VS Code treats it as a new extension, so the old one has to be uninstalled.
- **Marketplace** publishing needs a `workbench-soft` publisher there. The old listing stays under `oleg-chibikov`.

## Changes

- **`package.json`** `publisher` is `workbench-soft`.
- **`README.md`** the install command names the new id.
- **`CHANGELOG.md`** one entry under Unreleased.

## Steps, in commit order

1. This plan.
2. Rename the publisher, the README and the changelog.
3. Build the VSIX and install it in VS Code, with the old id removed.

## Docs to update

- `README.md` install command.
