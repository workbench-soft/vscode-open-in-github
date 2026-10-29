import * as assert from "assert";
import { bitbucketServerLinks } from "./bitbucket-server";

const remote = "https://bitbucket.org/my-project/my-repo";
const path = "rel/path/to/file.js";
const browse =
  "/projects/my-project/repos/my-repo/browse/rel/path/to/file.js?at=refs%2Fheads%2Fmaster";
const base = `https://bitbucket.org${browse}`;

suite("bitbucketServerLinks", () => {
  const link = bitbucketServerLinks.file;

  test("anchors one line", () => {
    assert.equal(
      link({ remote, branch: "master", path, lines: { start: 10 } }),
      `${base}#10`
    );
  });

  test("maps the host alone", () => {
    const mapping = { "https://bitbucket.org": "https://mapped.bitbucket.org" };
    assert.equal(
      link({ remote, branch: "master", path, mapping, lines: { start: 10 } }),
      `https://mapped.bitbucket.org${browse}#10`
    );
  });

  test("anchors a line range", () => {
    assert.equal(
      link({ remote, branch: "master", path, lines: { start: 10, end: 20 } }),
      `${base}#10-20`
    );
  });

  test("writes a range of one line as one line", () => {
    assert.equal(
      link({ remote, branch: "master", path, lines: { start: 10, end: 10 } }),
      `${base}#10`
    );
  });

  test("leaves out the anchor without lines", () => {
    assert.equal(link({ remote, branch: "master", path }), base);
  });

  test("opens the browse page for blame and history", () => {
    const target = { remote, branch: "master", path };
    assert.equal(bitbucketServerLinks.blame(target), base);
    assert.equal(bitbucketServerLinks.history(target), base);
  });
});
