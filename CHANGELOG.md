# Changelog

## Unreleased

- **Default branch** the repo now uses `main` in place of `master`. CI runs on pushes to `main`.
- **Releases** each push to `main` whose Checks pass gets a GitHub release with the `.vsix`. Checks and Release run on `ubuntu-latest`, since the repo is public.
