# Ship each build as a GitHub release

## What it does for the person

Each push to `main` whose Checks pass gets a GitHub release with the `.vsix` attached, so a person installs a build without packaging it.

## User flows

1. A PR merges into `main`.
2. Checks and the Release build start on the same push.
3. Checks pass, and the release `v2026.10.30.1` publishes with `open-in-remote-repo-2026.1030.1.vsix`.
4. A person downloads it and runs `code --install-extension` on the file.

## How it works: modules, files, data

- **Build** the `build` job of `.github/workflows/release.yml` packages the `.vsix` on `ubuntu-latest` and hands it to publish through the Actions cache. Its last step asks `release-gate.sh checks` for the Checks result once.
- **Publish** runs right after the build when Checks already passed. Otherwise the end of Checks starts Release on `workflow_run`, and `release-gate.sh build` finds the finished build. One publish runs at a time.
- **Cancel** a failed Checks run starts `release-gate.sh cancel`, which stops the unfinished build of the commit.

## Limits

- **Marketplace** a person publishes there by hand, since it needs a token.
- **Version** vsce takes semver only, so the `.vsix` reads `2026.1030.1`.

## Changes

### 2026-10-30 Ship each build as a GitHub release

#### The problem

- **Runner** Checks ran on the self-hosted runner on the Windows PC. The repo is public, so a fork's pull request could run its code on that PC.
- **No release** a passing build left no file behind. A person had to build the `.vsix` by hand.

#### What changes for people

- **Download** each push to `main` whose Checks pass gets a GitHub release `v2026.10.30.1` with the `.vsix` attached.
- **Install** `code --install-extension open-in-remote-repo-2026.1030.1.vsix` installs a downloaded build.
- **Marketplace** stays a manual step. A publish needs a token and a person.

#### Version

- **Tag** the date in Sydney, then the release of the day: `v2026.10.30.1`, from `.github/scripts/next-version.sh`.
- **Extension version** vsce takes semver only, so the build turns the tag into `2026.1030.1`. A month below 10 drops its leading zero, so 5 January reads `2026.105.1`. The commit in git keeps `1.19.0`.

#### Files

- **`.github/workflows/checks.yml`** runs on `ubuntu-latest`, with the mise tool cache on.
- **`.github/workflows/release.yml`** runs after Checks passes on `main`, packages the `.vsix` into `dist/` and creates the release.
- **`.github/scripts/`** `next-version.sh` and `release-notes.sh`, from the `repo-ci` skill.
- **`mise.toml`** a `build` task runs `vsce package -o dist/`.
- **`package.json`** `@vscode/vsce` joins the dev dependencies.
- **`.gitattributes`** keeps `*.sh` at LF line endings.

#### Commits, oldest first

1. Write this plan.
2. Move Checks to `ubuntu-latest` and add Release.
3. Update the README and the changelog.

#### Docs it updated

- The develop and release sections of `README.md`.
- `CHANGELOG.md` under Unreleased.

### 2026-11-09 Week review

- **Why** the parallel release change pushed the tag before the release, left comments above the wrong steps, a guard script with mode 100644 and agent rules in the docs.
- **Changes** `release.yml` follows the `repo-ci` template, with `gh release create --target`. The pasted "Release build timing" sections go.

### 2026-11-10 Docs follow the release gate

- **Why** Release now builds beside Checks through `release-gate.sh`. The README and the architecture page said only that a release follows green Checks, and the top of this spec was empty.
- **Changes** the top of this spec, the README Release section and the Releases decision describe the build, the gate and the cancel. A stray comment in the `on:` block of `release.yml` goes.
