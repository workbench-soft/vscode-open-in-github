/** The text to show for a failed command: git's own message when it has one. */
export function errorText(err: unknown): string {
  if (typeof err === "string") return err;
  const { message, code } = (err ?? {}) as { message?: string; code?: string };
  return message ?? code ?? String(err);
}
