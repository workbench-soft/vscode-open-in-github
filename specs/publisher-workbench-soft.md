# Publish the extension under workbench-soft

## What it does for the person

None written down yet.

## User flows

None written down yet.

## How it works: modules, files, data

Each entry below names the files it changed.

## Limits

None written down yet.

## Changes

### 2025-10-29 Publish the extension under workbench-soft

#### The problem

The extension id was `oleg-chibikov.open-in-remote-repo`. The repo is owned by `workbench-soft` now, and the publisher should match it.

#### What changes for people

- **Install** the new id is `workbench-soft.open-in-remote-repo`. VS Code sees a new extension, so people have to uninstall the old one.
- **Marketplace** a publish needs a `workbench-soft` publisher on the Marketplace. The old listing remains under `oleg-chibikov`.

#### Files

- **`package.json`** `publisher` reads `workbench-soft`.
- **`README.md`** the install command uses the new id.
- **`CHANGELOG.md`** gains one entry under Unreleased.

#### Commits, oldest first

1. Write this plan.
2. Change the publisher, the README and the changelog.
3. Build the VSIX, remove the old id from VS Code, and install the new one.

#### Docs it updated

- The install command in `README.md`.

### 2026-11-17 Publish to the Marketplace from CI with Trusted Publishing

#### The problem

The `workbench-soft` publisher exists since 2026-11-17, but the extension has no Marketplace page. The upload page asks for a picture CAPTCHA, and a token in the secrets of a public repo was the reason CI stayed out.

#### What changes for people

- **Marketplace** each GitHub release also lands on the Marketplace as `workbench-soft.open-in-remote-repo`, with the same `.vsix`.

#### How

- **Trusted Publishing** the Marketplace policy "Release workflow" trusts `workbench-soft/vscode-open-in-github` and `release.yml`. The publish job asks GitHub for an OIDC token, and `vsce publish --oidc` trades it for a 15 minute Marketplace credential. No token sits in the repo.
- **Order** the GitHub release comes first, so a failed Marketplace step leaves the release in place.

#### Files

- **`.github/workflows/release.yml`** the publish job gets `id-token: write` and a step after the release.
- **`README.md`**, **`docs/architecture.md`** and **`CHANGELOG.md`** say the Marketplace publish runs in CI.
