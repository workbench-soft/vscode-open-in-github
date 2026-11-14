import { KnownError } from "../known-error";

/** Looks up `text` in the l10n bundles, as `l10n.t` does. */
export type Translate = (text: string, ...args: string[]) => string;

/**
 * The text to show for a failed command: the translated message of a
 * `KnownError`, else git's own message when it has one.
 */
export function errorText(err: unknown, translate?: Translate): string {
  if (err instanceof KnownError) {
    return translate ? translate(err.text, ...err.args) : err.message;
  }
  if (typeof err === "string") return err;
  const { message, code } = (err ?? {}) as { message?: string; code?: string };
  return message ?? code ?? String(err);
}
