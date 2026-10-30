import { SelectedLines } from "../links/host-links";

/** The parts of a VS Code selection the link needs, 0-based. */
export interface EditorSelection {
  start: { line: number; character: number };
  end: { line: number; character: number };
}

/**
 * Turns the selection into 1-based lines. A selection that ends at the start
 * of a line, as Shift+Down or a triple click leaves it, stops on the line
 * above.
 */
export function selectedLines({ start, end }: EditorSelection): SelectedLines {
  const last =
    end.character === 0 && end.line > start.line ? end.line - 1 : end.line;
  return { start: start.line + 1, end: last + 1 };
}
