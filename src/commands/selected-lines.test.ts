import * as assert from "assert";
import { selectedLines } from "./selected-lines";

const at = (line: number, character: number) => ({ line, character });

suite("selectedLines", () => {
  test("counts lines from 1", () => {
    assert.deepEqual(selectedLines({ start: at(2, 4), end: at(4, 7) }), {
      start: 3,
      end: 5,
    });
  });

  test("stops on the line above when the end is at the start of a line", () => {
    assert.deepEqual(selectedLines({ start: at(2, 0), end: at(5, 0) }), {
      start: 3,
      end: 5,
    });
  });

  test("keeps the cursor line with no selection", () => {
    assert.deepEqual(selectedLines({ start: at(6, 0), end: at(6, 0) }), {
      start: 7,
      end: 7,
    });
  });
});
