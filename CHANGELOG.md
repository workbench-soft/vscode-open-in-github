# Changelog

## Unreleased

- **CI** `gh release create` makes the tag with the release, so a failed publish leaves no stray tag. The Release comments say what each step does, the guard script is the `repo-ci` one with its run bit, and the docs lose the agent rules pasted in by the CI rollout.
- **CI** Format the workflow YAML so the checks pass.
- **Parallel release builds** releases build beside checks after a push. Only publication waits for matching checks; open PRs hold no build.

- **CI** Release waits while a PR of an agent session is open, so the last merge of a batch releases them all.
- **Docs** each heading of `docs/features.md` links its spec, and each feature that had no spec got one.
- **Markdown** markdownlint-cli2 lints the docs in `mise run lint` and CI.

- Specs: one file per feature under `specs/`, with each dated spec moved in as an entry under `## Changes`.
- **Architecture decisions** `docs/architecture.md` gets a Decisions section. Each big choice names its reason, its cost and the rivals it beat.

- **Lint and format** oxlint lints the code, and oxfmt formats it in place of Prettier. `mise run lint` runs both.

- **Languages** the commands, settings and messages follow the VS Code display language: Russian, German, French, Spanish, Chinese, Japanese, Korean and Norwegian, along with English.
- **Install** the README gives Ctrl+P for Quick Open, with ⌘+P for a Mac.
- **Credits** the README names Stanislav Sysoev, who wrote the original Open in GitHub.
- **CI** runs on a GitHub runner on each push and PR, since the repo is public.
- **Default branch** the repo now uses `main` in place of `master`. CI runs on pushes to `main`.
- **Releases** each push to `main` whose Checks pass gets a GitHub release with the `.vsix`, built on `ubuntu-latest`.
