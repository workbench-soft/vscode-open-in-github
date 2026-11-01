# Commands and messages in 9 languages

## What it does for the person

The command names, the settings and the messages follow the VS Code display
language when it is English, Russian, German, French, Spanish, Chinese,
Japanese, Korean or Norwegian. Any other display language gets English.

## How it works

- **Manifest** `package.json` names each command and setting as `%key%`.
  `package.nls.json` holds the English, and `package.nls.<code>.json` the rest.
- **Messages** the code calls `l10n.t()` from the `vscode` module.
  `l10n/bundle.l10n.<code>.json` maps each English message to its translation.
- **Codes** VS Code calls Simplified Chinese `zh-cn`.

## Limits

- **Norwegian** VS Code ships no Norwegian language pack, so `nb` shows only
  with a community pack.

## Changes

### 2026-10-31 9 languages

- **Why** the owner wants each workbench-soft app in 9 languages.
- **Steps** this spec, then the manifest strings, the messages and the docs.
