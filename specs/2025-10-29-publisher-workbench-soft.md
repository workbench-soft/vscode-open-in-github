# Publish the extension under workbench-soft

## The problem

The extension id was `oleg-chibikov.open-in-remote-repo`. The repo is owned by `workbench-soft` now, and the publisher should match it.

## What changes for people

- **Install** the new id is `workbench-soft.open-in-remote-repo`. VS Code sees a new extension, so people have to uninstall the old one.
- **Marketplace** a publish needs a `workbench-soft` publisher on the Marketplace. The old listing remains under `oleg-chibikov`.

## Files

- **`package.json`** `publisher` reads `workbench-soft`.
- **`README.md`** the install command uses the new id.
- **`CHANGELOG.md`** gains one entry under Unreleased.

## Commits, oldest first

1. Write this plan.
2. Change the publisher, the README and the changelog.
3. Build the VSIX, remove the old id from VS Code, and install the new one.

## Docs it updated

- The install command in `README.md`.
