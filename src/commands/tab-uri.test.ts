import * as assert from "assert";
import type { Uri } from "vscode";
import { tabUri } from "./tab-uri";

const file = { fsPath: "/repo/logo.png" } as Uri;

suite("tabUri", () => {
  test("reads the file of an image preview or a notebook", () => {
    assert.equal(tabUri({ uri: file, viewType: "imagePreview" }), file);
  });

  test("reads the changed side of a diff", () => {
    assert.equal(tabUri({ original: {}, modified: file }), file);
  });

  test("gives nothing for a terminal or a webview tab", () => {
    assert.equal(tabUri({ viewType: "markdown.preview" }), undefined);
    assert.equal(tabUri(undefined), undefined);
  });
});
