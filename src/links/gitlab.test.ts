import * as assert from "assert";
import { gitlabLinks } from "./gitlab";

const remote = "https://gitlab.com/test/repo";
const path = "rel/path/to/file.js";
const mapping = {
  "https://gitlab.com/test/repo": "https://mapped.gitlab.com/test/repo",
};

for (const view of ["file", "blame"] as const) {
  suite(`gitlabLinks.${view}`, () => {
    const link = gitlabLinks[view];
    const page = view === "file" ? "blob" : "blame";
    const base = `https://gitlab.com/test/repo/${page}/master/rel/path/to/file.js`;

    test("anchors one line", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10 } }),
        `${base}#L10`
      );
    });

    test("swaps the remote through the mapping", () => {
      assert.equal(
        link({ remote, branch: "master", path, mapping, lines: { start: 10 } }),
        `https://mapped.gitlab.com/test/repo/${page}/master/rel/path/to/file.js#L10`
      );
    });

    test("anchors a line range", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10, end: 20 } }),
        `${base}#L10-20`
      );
    });

    test("writes a range of one line as one line", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10, end: 10 } }),
        `${base}#L10`
      );
    });

    test("leaves out the anchor without lines", () => {
      assert.equal(link({ remote, branch: "master", path }), base);
    });
  });
}

suite("gitlabLinks.file extras", () => {
  test("escapes the branch name", () => {
    assert.equal(
      gitlabLinks.file({ remote, branch: "feature/#foo", path }),
      "https://gitlab.com/test/repo/blob/feature/%23foo/rel/path/to/file.js"
    );
  });
});
