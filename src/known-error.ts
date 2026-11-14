/**
 * A failure with a message from the l10n bundles. `text` is the English key,
 * with `{0}` for each of `args`, so `src/commands/` translates it before it
 * shows. `src/git/` and `src/links/` throw it without importing `vscode`.
 */
export class KnownError extends Error {
  constructor(
    readonly text: string,
    readonly args: string[] = []
  ) {
    super(text.replace(/\{(\d+)\}/g, (_, i: string) => args[Number(i)] ?? ""));
  }
}
