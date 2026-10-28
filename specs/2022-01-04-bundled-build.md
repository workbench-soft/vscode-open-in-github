# A bundled build, plain markdown links and remote fixes

Done from 2022-01-04 to 2023-04-10, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

The extension loaded slowly and markdown links showed the rendered page.

## User flows it touches

- **Install** a smaller extension that loads faster.
- **Markdown file** links add `?plain=1`.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`build.js`** new.
- **`.vscode/tasks.json`** changed.
- **`tsconfig.json`** changed.
- **`.vscode/launch.json`** changed.
- **`src/test/file.test.ts`** changed.
- **`LICENSE`** new.
- **`src/test/bitbucketServer.test.ts`** moved here.
- **`src/test/blame.test.ts`** moved here.
- **Other files** 7 more.

## Steps, in commit order

1. chore: add license (a2bb99d, 2022-01-04)
2. chore(deps): bump ansi-regex from 5.0.0 to 5.0.1 (b795201, 2022-01-03)
3. feat: utilise a bundler for smaller builds and faster load times (0e576d3, 2022-01-04)
4. chore: update package-lock.json (5ea1075, 2022-01-05)
5. build: fix some tsconfig issue and upgrade typescript, add typechecking as part of a compile script (18df444, 2022-01-05)
6. 1.16.0 (0cd0227, 2022-01-05)
7. chore: modernize extension to match newly generated vscode extensions (38d17db, 2022-09-04)
8. feat: add ?plain=1 for makrdown links (4dcd065, 2022-09-04)
9. 1.17.0 (6f0677a, 2022-09-04)
10. fix: revert open@7.4.2 -> opn@5.4.0 because xdg-open causes issues in remote env (b60fa1f, 2023-01-18)
11. 1.17.1 (5c96da8, 2023-01-18)
12. fix: don't swallow ERR_CHILD_PROCESS_STDIO_MAXBUFFER errors (9ecb5a7, 2023-04-10)
13. fix: update opn -> open, and make open external for bundling to avoid issues with xdg-open (3a7654d, 2023-04-10)
14. 1.17.2 (67a49a7, 2023-04-10)
15. chore: ignore more files to reduce the size of the extension (30abd7b, 2023-04-10)

## Docs to update

None.
