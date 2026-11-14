import type { Uri } from "vscode";

/**
 * The file of an editor tab with no text editor, such as an image or PDF
 * preview, a notebook, or the changed side of a diff.
 */
export function tabUri(input: unknown): Uri | undefined {
  const { uri, modified } = (input ?? {}) as { uri?: Uri; modified?: Uri };
  return uri ?? modified;
}
