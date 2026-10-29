# One bundled file, plain markdown links and fixes for remote windows

Built from 2022-01-04 to 2023-04-10. A later history reset folded these commits into one, and the local backup mirror of `vscode-open-in-github` keeps the originals under `refs/backup/master`.

## The problem

The extension took long to load. Links to markdown also opened the rendered page.

## What changes for people

- **Install** the package is smaller and loads faster.
- **Markdown file** each link ends in `?plain=1`.

## Files

- **`package.json`** edited.
- **`src/common.ts`** edited.
- **`build.js`** added.
- **`.vscode/tasks.json`** edited.
- **`tsconfig.json`** edited.
- **`.vscode/launch.json`** edited.
- **`src/test/file.test.ts`** edited.
- **`LICENSE`** added.
- **`src/test/bitbucketServer.test.ts`** moved in.
- **`src/test/blame.test.ts`** moved in.
- **The rest** 7 more files.

## Commits, oldest first

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

## Docs it updated

No doc needed a change.
