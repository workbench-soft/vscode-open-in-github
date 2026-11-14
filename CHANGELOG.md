# Changelog

## Unreleased

- **Languages** the git timeout, a missing remote and a Bitbucket Server remote with no project show their error in the VS Code display language.

- **Smaller package** the unused screenshot of the old remote and branch picker is gone.

- **Right branch** a link goes to the branch when a tag shares its name, to the fetch remote when it also pushes to a mirror, and opens for a file deleted on disk but still open in the editor.

- **Safer links** only http and https links open in the browser, and the "no web page" error leaves the token out of the remote URL.

- **Smaller package** the .vsix leaves out TODO.md, docs, lint configs, the git hook and unused screenshots. A test checks each bundle translates every message the code shows.

- **Older runs stop on GitHub** a newer push to `main` cancels the Checks and the release build of the older commit through `concurrency`, with the local-ci page off too.

- **Lint before the push** a pre-push hook runs `mise run lint`, so a lint or format error stays on the PC instead of failing Checks on `main`.

- **Docs** the README, the architecture page and the release spec describe the build beside Checks and the cancel on a failed Checks run.

- **CI** Release builds beside Checks again and publishes once they pass, through `release-gate.sh`. A failed Checks run cancels the build. No job waits on a runner for the other workflow.

- **CI** Release starts on `workflow_run` once Checks pass on `main`, one at a time. It no longer holds a PC runner while it waits, which starved Checks and timed releases out.

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
