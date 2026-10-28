# GitLab support and fixed line links

Done from 2018-11-28 to 2019-09-14, before the history was reset to one commit. The old commits sit under `refs/backup/master` in the local backup mirror of `vscode-open-in-github`.

## Why

GitLab users needed the commands, and line ranges used the wrong format.

## User flows it touches

- **GitLab repo** the commands open GitLab with the right line range.
- **Branch names** with special characters are escaped.

## Changes

- **`package.json`** changed.
- **`src/common.ts`** changed.
- **`test/file.test.ts`** changed.
- **`src/blame.ts`** changed.
- **`src/file.ts`** changed.
- **`src/history.ts`** changed.
- **`test/blame.test.ts`** changed.
- **`test/common.test.ts`** changed.

## Steps, in commit order

1. fix: Update dependencies that contained compromised event-stream library (4a84b2d, 2018-11-28)
2. 1.10.1 (6b85f47, 2018-11-28)
3. fix: escape branch names in github url (5363fc7, 2018-11-23)
4. feat: Use dash instead of colon for GitHub line pointer (7712688, 2019-01-02)
5. chore: fix tests after 7712688 (8b06909, 2019-02-13)
6. 1.11.0 (1f292c2, 2019-02-13)
7. 1.12.0 (03fe82e, 2019-02-13)
8. fix line formatting for gitlab urls (don't add 'L' from second line when present) (70eb6be, 2019-09-10)
9. fix: Fix npm audit warnings (93e27d5, 2019-09-14)
10. 1.13.0 (bda9a44, 2019-09-14)
11. docs: add gitlab support to docs (16267d3, 2019-09-14)

## Docs to update

- `README.md`
