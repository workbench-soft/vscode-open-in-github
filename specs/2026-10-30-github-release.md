# Ship each build as a GitHub release

## The problem

- **Runner** Checks ran on the self-hosted runner on the Windows PC. The repo is public, so a fork's pull request could run its code on that PC.
- **No release** a passing build left no file behind. A person had to build the `.vsix` by hand.

## What changes for people

- **Download** each push to `main` whose Checks pass gets a GitHub release `v2026.10.30.1` with the `.vsix` attached.
- **Install** `code --install-extension open-in-remote-repo-2026.1030.1.vsix` installs a downloaded build.
- **Marketplace** stays a manual step. A publish needs a token and a person.

## Version

- **Tag** the date in Sydney, then the release of the day: `v2026.10.30.1`, from `.github/scripts/next-version.sh`.
- **Extension version** vsce takes semver only, so the build turns the tag into `2026.1030.1`. A month below 10 drops its leading zero, so 5 January reads `2026.105.1`. The commit in git keeps `1.19.0`.

## Files

- **`.github/workflows/checks.yml`** runs on `ubuntu-latest`, with the mise tool cache on.
- **`.github/workflows/release.yml`** runs after Checks passes on `main`, packages the `.vsix` into `dist/` and creates the release.
- **`.github/scripts/`** `next-version.sh` and `release-notes.sh`, from the `repo-ci` skill.
- **`mise.toml`** a `build` task runs `vsce package -o dist/`.
- **`package.json`** `@vscode/vsce` joins the dev dependencies.
- **`.gitattributes`** keeps `*.sh` at LF line endings.

## Commits, oldest first

1. Write this plan.
2. Move Checks to `ubuntu-latest` and add Release.
3. Update the README and the changelog.

## Docs it updated

- The develop and release sections of `README.md`.
- `CHANGELOG.md` under Unreleased.
