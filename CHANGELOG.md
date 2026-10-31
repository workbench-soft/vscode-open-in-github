# Changelog

## Unreleased

- **Architecture decisions** `docs/architecture.md` gets a Decisions section. Each big choice names its reason, its cost and the rivals it beat.

- **Lint and format** oxlint lints the code, and oxfmt formats it in place of Prettier. `mise run lint` runs both.

- **Languages** the commands, settings and messages follow the VS Code display language: Russian, German, French, Spanish, Chinese, Japanese, Korean and Norwegian, along with English.
- **Install** the README gives Ctrl+P for Quick Open, with ⌘+P for a Mac.
- **Credits** the README names Stanislav Sysoev, who wrote the original Open in GitHub.
- **CI** runs on a GitHub runner on each push and PR, since the repo is public.
- **Default branch** the repo now uses `main` in place of `master`. CI runs on pushes to `main`.
- **Releases** each push to `main` whose Checks pass gets a GitHub release with the `.vsix`, built on `ubuntu-latest`.
